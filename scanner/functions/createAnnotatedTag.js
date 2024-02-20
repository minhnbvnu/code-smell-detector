function createAnnotatedTag(tag, branch, repoOwner, repoName) {
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

            return octokit.git.createTag({
                owner,
                repo,
                tag,
                message: 'this is annotated tag',
                object: sha,
                type: 'commit',
                tagger: {
                    name: 'test',
                    email: 'test@example.com',
                    date: '2019-10-09T15:00:00+09:00'
                }
            });
        })
        .then(response => {
            const { sha } = response.data;

            return octokit.git.createRef({
                owner,
                repo,
                ref: `refs/tags/${tag}`,
                sha
            });
        })
        .catch(() => {
            Assert.fail('failed to create annotated tag');
        });
}