import {Octokit} from "@octokit/core";

class GithubService{
    private octokit:Octokit;
    constructor() {
        this.octokit = new Octokit({
            auth: process.env.REACT_APP_GITHUB_TOKEN
        })
    }
    // Return available information about the GitHub account of the user defined by his username
     getUser (){
        return this.octokit.request('GET /users/{username}', {
            username: process.env.REACT_APP_GITHUB_USERNAME||''
        });
    }
    // Return a list of repositories for the specified user
    getRepositories () {
        return this.octokit.request('GET /users/{username}/repos', {
            username: process.env.REACT_APP_GITHUB_USERNAME||''
        });
    }
}
export default new GithubService();
