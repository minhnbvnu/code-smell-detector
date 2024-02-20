async function getImageRepositoryAndTags(imageId, registry) {
    // ACR registry name is the registry minus .azurecr.io
    const registryName = registry.replace(/\..*/, '');

    // Get list of repositories
    console.log(`(*) Getting repository list for ACR "${registryName}"...`)
    const repositoryListOutput = await asyncUtils.spawn('az',
        ['acr', 'repository', 'list', '--name', registryName],
        { shell: true, stdio: 'pipe' });
    const repositoryList = JSON.parse(repositoryListOutput);

    let repoAndTagList = [];
    await asyncUtils.forEach(repositoryList, async (repository) => {
        console.log(`(*) Checking in for "${imageId}" in "${repository}"...`);
        const tagListOutput = await asyncUtils.spawn('az',
            ['acr', 'repository', 'show-tags', '--detail', '--name', registryName, '--repository', repository, "--query", `"[?digest=='${imageId}'].name"`],
            { shell: true, stdio: 'pipe' });
        const additionalTags = JSON.parse(tagListOutput);
        repoAndTagList = repoAndTagList.concat(additionalTags.map((tag) => {
            return { 
                repository:repository,
                tag:tag
            };
        }));
    });
    return repoAndTagList;
}