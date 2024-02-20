function getStatus(repoOwner, repoName, sha) {
    return octokit.repos.getCombinedStatusForRef({
        owner: repoOwner,
        repo: repoName,
        ref: sha
    });
}