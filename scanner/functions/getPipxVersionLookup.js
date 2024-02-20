async function getPipxVersionLookup(imageTagOrContainerName) {
    // --format json doesn't work with pipx, so have to do text parsing
    const packageVersionListOutput = await getCommandOutputFromContainer(imageTagOrContainerName, 'pipx list');

    const packageVersionListOutputLines = packageVersionListOutput.split('\n');
    return packageVersionListOutputLines.reduce((prev, current) => {
        const versionCaptureGroup = /package\s(.+)\s(.+),/.exec(current);
        if (versionCaptureGroup) {
            prev[versionCaptureGroup[1]] = versionCaptureGroup[2];
        }
        return prev;
    }, {});
}