function createBranch(branch, repoOwner, repoName) {
    const owner = repoOwner || 'screwdriver-cd-test';
    const repo = repoName || 'functional-git';

    // Create a branch from the tip of the master branch
    return octokit.git
        .getRef({
            owner,
            repo,
            ref: 'heads/master'
        })
        .then(referenceData => {
            const { sha } = referenceData.data.object;

            return octokit.git.createRef({
                owner,
                repo,
                ref: `refs/heads/${branch}`,
                sha
            });
        })
        .catch(err => {
            // throws an error if a branch already exists, so this is fine
            Assert.strictEqual(err.status, 422);
        });
}