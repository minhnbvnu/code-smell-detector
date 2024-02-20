async function getImageInfo(imageTagOrContainerName) {
    let image = imageTagOrContainerName;
    if(isContainerName(imageTagOrContainerName)) {
        image = await asyncUtils.spawn('docker', ['inspect', "--format='{{.Image}}'", imageTagOrContainerName.trim()], { shell: true, stdio: 'pipe' });
    }
    // If image not yet published, there will be no repo digests, so set to N/A if that is the case
    let name, digest;
    try {
        const imageNameAndDigest = await asyncUtils.spawn('docker', ['inspect', "--format='{{index .RepoDigests 0}}'", image], { shell: true, stdio: 'pipe' });
        [name, digest] = imageNameAndDigest.trim().split('@');
    } catch(err) {
        if(err.result.indexOf('Template parsing error') > 0) {
            name = 'N/A';
            digest = 'N/A';
        } else {
            throw err;
        }
    }
    const nonRootUser = await getCommandOutputFromContainer(imageTagOrContainerName, 'id -un 1000', true)
    return {
        "name": name,
        "digest": digest,
        "user": nonRootUser
    }
}