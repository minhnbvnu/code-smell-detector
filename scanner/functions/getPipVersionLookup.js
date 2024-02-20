async function getPipVersionLookup(imageTagOrContainerName, imageId) {
    const packageVersionListOutput = await getCommandOutputFromContainer(imageTagOrContainerName, 'pip list --disable-pip-version-check --no-python-version-warning --format json', false, getUserName(imageId));

    const packageVersionList = JSON.parse(packageVersionListOutput);

    return packageVersionList.reduce((prev, current) => {
        prev[current.name] = current.version;
        return prev;
    }, {});
}