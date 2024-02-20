function mergePullRequest(repoOwner, repoName, prNumber) {
    return octokit.pulls.merge({
        owner: repoOwner,
        repo: repoName,
        pull_number: prNumber
    });
}