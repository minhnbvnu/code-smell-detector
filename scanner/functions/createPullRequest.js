function createPullRequest(sourceBranch, targetBranch, repoOwner, repoName) {
    return octokit.pulls.create({
        owner: repoOwner,
        repo: repoName,
        title: '[DNM] testing',
        head: sourceBranch,
        base: targetBranch
    });
}