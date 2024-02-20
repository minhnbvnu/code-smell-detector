async function deleteUntaggedImages(imageIds, registry) {

    console.log('\n*** Deleting untagged images ***');
    // ACR registry name is the registry minus .azurecr.io
    const registryName = registry.replace(/\..*/, '');

    const manifests = await getImageManifests(imageIds, registry);

    console.log(`(*) Manifests to delete: ${JSON.stringify(manifests, undefined, 4)}`);

    const spawnOpts = { stdio: 'inherit', shell: true };
    await asyncUtils.forEach(manifests, async (manifest) => {
        if (manifest.tags.length > 0) {
            console.log(`(!) Skipping ${manifest.digest} because it has tags: ${manifest.tags}`);
            return;
        }
        const fullImageId = `${manifest.repository}@${manifest.digest}`;
        console.log(`(*) Deleting ${fullImageId}...`);
        // Pull and build patched tag
        await asyncUtils.spawn('az', [
            'acr',
            'repository',
            'delete',
            '--yes',
            '--name', registryName,
            '--image', fullImageId
        ], spawnOpts);
    });

    console.log('(*) Done deleting manifests!')
}