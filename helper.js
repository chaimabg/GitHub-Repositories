const Git = require('nodegit');
const Path = require('path');

const lhrc_options = require('../lighthouserc.js');
const ApiClient = require('@lhci/utils/src/api-client.js');

/**
 * @param {LHCI.UploadCommand.Options} options
 * @return {Promise<void>}
 */
module.exports = async function uploadToLhciServer(lhr, options = false) {
  if ( !options ) {
    options = lhrc_options.ci.upload;
  }
  if (!options.token) { throw new Error('Must provide token for LHCI target'); }

  const api = new ApiClient({...options, rootURL: options.serverBaseUrl});

  api.setBuildToken(options.token);
  const project = await api.findProjectByToken(options.token);
  if (!project) {
    throw new Error('Could not find active project with provided token');
  }

  const repo = await Git.Repository.open(Path.resolve(__dirname, '../'));
  const head_commit = await repo.getHeadCommit();
  const branch = 'master';
  const hash = await head_commit.sha();
  const authoSignature = await head_commit.author();
  const commitMessage = await head_commit.message();
  const commitDate = await head_commit.date();
  const author = await authoSignature.name();
  const ancestorHash = false;
  const runDate = new Date();

  const build = await api.createBuild({
    projectId: project.id,
    lifecycle: 'unsealed',
    hash,
    branch,
    ancestorHash,
    commitMessage: commitMessage,
    author: author,
    avatarUrl: '',
    externalBuildUrl: '',
    runAt: runDate.toISOString(),
    committedAt: commitDate.toISOString(),
    ancestorCommittedAt: ancestorHash ? undefined : undefined,
  });

  const targetUrlMap = new Map();

  const buildViewUrl = new URL(
    `/app/projects/${project.slug}/compare/${build.id}`,
    options.serverBaseUrl
  );

  const parsedLHR = lhr;
  const url = parsedLHR.finalUrl;
  const run = await api.createRun({
    projectId: project.id,
    buildId: build.id,
    representative: false,
    url,
    lhr: JSON.stringify(lhr),
  });

  buildViewUrl.searchParams.set('compareUrl', url);
  targetUrlMap.set(parsedLHR.finalUrl, buildViewUrl.href);
  buildViewUrl.searchParams.delete('compareUrl');
  await api.sealBuild(build.projectId, build.id);

  const info = {
    options,
    project,
    build,
    run: {
      id: run.id,
      date: runDate
    },
    commit: {
      branch,
      hash,
      commitMessage,
      commitDate,
      author
    },
  };

  return info;
}