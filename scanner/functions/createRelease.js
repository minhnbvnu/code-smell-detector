function createRelease(tagName, repoOwner, repoName) {
    const owner = repoOwner || 'screwdriver-cd-test';
    const repo = repoName || 'functional-git';

    return octokit.repos
        .createRelease({
            owner,
            repo,
            tag_name: tagName,
            name: tagName
        })
        .catch(() => {
            Assert.fail('failed to create release');
        });
}