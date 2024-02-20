function removeBranch(repoOwner, repoName, branchName) {
    const branchParams = {
        owner: repoOwner,
        repo: repoName,
        ref: `heads/${branchName}`
    };

    return octokit.git.getRef(branchParams).then(() => octokit.git.deleteRef(branchParams));
}