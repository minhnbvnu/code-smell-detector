function createTag(tag, branch, repoOwner, repoName) {
    const owner = repoOwner || 'screwdriver-cd-test';
    const repo = repoName || 'functional-git';

    return octokit.git
        .getRef({
            owner,
            repo,
            ref: `heads/${branch}`
        })
        .then(referenceData => {
            const { sha } = referenceData.data.object;

            return octokit.git.createRef({
                owner,
                repo,
                ref: `refs/tags/${tag}`,
                sha
            });
        })
        .catch(() => {
            Assert.fail('failed to create tag');
        });
}