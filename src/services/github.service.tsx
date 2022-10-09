import {Octokit} from "@octokit/core";

class GithubService{
    private octokit:Octokit;
    constructor() {
        this.octokit = new Octokit({
            auth: process.env.REACT_APP_GITHUB_TOKEN
        })
    }
     getUser (){
        return this.octokit.request('GET /users/{username}', {
            username: process.env.REACT_APP_GITHUB_USERNAME||''
        });
    }
    getRepositories () {
        return this.octokit.request('GET /users/{username}/repos', {
            username: process.env.REACT_APP_GITHUB_USERNAME||''
        });
    }
}
export default new GithubService();
