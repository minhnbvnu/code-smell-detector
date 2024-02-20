function closePullRequest(repoOwner, repoName, prNumber) {
    return octokit.pulls.update({
        owner: repoOwner,
        repo: repoName,
        pull_number: prNumber,
        state: 'closed'
    });
}