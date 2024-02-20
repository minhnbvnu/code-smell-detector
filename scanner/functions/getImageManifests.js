async function getImageManifests(imageIds, registry) {
    // ACR registry name is the registry minus .azurecr.io
    const registryName = registry.replace(/\..*/, '');

    let manifests = [];

    // Get list of repositories
    console.log(`(*) Getting repository list for ACR "${registryName}"...`)
    const repositoryListOutput = await asyncUtils.spawn('az',
        ['acr', 'repository', 'list', '--name', registryName],
        { shell: true, stdio: 'pipe' });
    const repositoryList = JSON.parse(repositoryListOutput);

    // Query each repository for images, then add any tags found to the list
    const query = imageIds.reduce((prev, current) => {
        return prev ? `${prev} || digest=='${current}'` : `"[?digest=='${current}'`;
    }, null) + '] | []"';
    await asyncUtils.forEach(repositoryList, async (repository) => {
        console.log(`(*) Getting manifests from "${repository}"...`);
        const registryManifestListOutput = await asyncUtils.spawn('az',
            ['acr', 'repository', 'show-manifests', '--name', registryName, '--repository', repository, "--query", query],
            { shell: true, stdio: 'pipe' });
        let registryManifestList = JSON.parse(registryManifestListOutput);
        registryManifestList = registryManifestList.map((manifest) => {
            manifest.repository = repository;
            return manifest;
        });
        manifests = manifests.concat(registryManifestList);
    });

    return manifests;
}