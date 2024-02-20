async function patchImage(imageId, patchPath, dockerFilePath, bumpVersion, registry) {
    console.log(`\n*** Updating Image: ${imageId} ***`);
    const spawnOpts = { stdio: 'inherit', cwd: patchPath, shell: true };

    // Get repository and tag list for imageId
    let repoAndTagList = await getImageRepositoryAndTags(imageId, registry);
    if(repoAndTagList.length === 0) {
        console.log('(*) No tags to patch. Skipping.');
        return;
    }

    console.log(`(*) Tags to update: ${
            JSON.stringify(repoAndTagList.reduce((prev, repoAndTag) => { return prev + repoAndTag.repository + ':' + repoAndTag.tag + ' ' }, ''), undefined, 4)
        }`);

    // Bump breakfix number of it applies
    if(bumpVersion) {
        repoAndTagList = updateVersionTags(repoAndTagList);
    }

    //Generate tag arguments
    const tagArgs = repoAndTagList.reduce((prev, repoAndTag) => {
        return prev.concat(['--tag', `${registry}/${repoAndTag.repository}:${repoAndTag.tag}`])
    }, []);

    // Pull and build patched image for tag
    let retry = false;
    do {
        try {
            await asyncUtils.spawn('docker', [ 
                'build',
                '--pull',
                '--build-arg',
                `ORIGINAL_IMAGE=${registry}/${repoAndTagList[0].repository}@${imageId}`]
                .concat(tagArgs)
                .concat('-f', dockerFilePath, patchPath), spawnOpts);
        } catch (ex) {
            // Try to clean out unused images and retry once if get an out of storage response
            if (ex.result && ex.result.indexOf('no space left on device') >= 0 && retry === false) {
                console.log(`(*) Out of space - pruning all unused images...`);
                await asyncUtils.spawn('docker', ['image', 'prune', '--all', '--force'], spawnOpts);
                console.log(`(*) Retrying...`);
                retry = true;
            } else {
                throw ex;
            }
        }    
    } while (retry);

    // Push updates
    await asyncUtils.forEach(repoAndTagList, async (repoAndTag) => {
        await asyncUtils.spawn('docker', ['push', `${registry}/${repoAndTag.repository}:${repoAndTag.tag}`], spawnOpts);
    });

    // Prune proactively to reduce space use
    console.log(`(*) Pruning dangling images...`);
    await asyncUtils.spawn('docker', ['image', 'prune', '--force'], spawnOpts);
}