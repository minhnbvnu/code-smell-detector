function cleanUpRepository(branch, tags, repoOwner, repoName) {
    const branchParams = {
        owner: repoOwner,
        repo: repoName,
        ref: `heads/${branch}`
    };

    const removeTagPromises = tags.map(tag => {
        const tagParams = {
            owner: repoOwner,
            repo: repoName,
            ref: `tags/${tag}`
        };

        return octokit.git.getRef(tagParams).then(() => octokit.git.deleteRef(tagParams));
    });

    return Promise.all([
        octokit.git.getRef(branchParams).then(() => octokit.git.deleteRef(branchParams)),
        ...removeTagPromises
    ]).catch(err => Assert.strictEqual(404, err.status));
}