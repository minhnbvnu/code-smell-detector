function createFile(branch, repoOwner, repoName, directoryName, commitMessage) {
    // eslint-disable-next-line new-cap
    const content = new Buffer.alloc(MAX_CONTENT_LENGTH, randomString(MAX_CONTENT_LENGTH));
    const filename = randomString(MAX_FILENAME_LENGTH);
    const owner = repoOwner || 'screwdriver-cd-test';
    const repo = repoName || 'functional-git';
    const filePath = directoryName || 'testfiles';
    const message = commitMessage || new Date().toString(); // default commit message is the current time

    return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `${filePath}/${filename}`,
        message,
        content: content.toString('base64'), // content needs to be transmitted in base64
        branch
    });
}