async function isImageAlreadyPublished(registryName, repositoryName, tagName) {
    registryName = registryName.replace(/\.azurecr\.io.*/, '');
    // Check if repository exists
    const repositoriesOutput = await asyncUtils.spawn('az', ['acr', 'repository', 'list', '--name', registryName], { shell: true, stdio: 'pipe' });
    const repositories = JSON.parse(repositoriesOutput);
    if (repositories.indexOf(repositoryName) < 0) {
        console.log('(*) Repository does not exist. Image version has not been published yet.')
        return false;
    }

    // Assuming repository exists, check if tag exists
    const tagListOutput = await asyncUtils.spawn('az', ['acr', 'repository', 'show-tags',
        '--name', registryName,
        '--repository', repositoryName,
        '--query', `"[?@=='${tagName}']"`
    ], { shell: true, stdio: 'pipe' });
    const tagList = JSON.parse(tagListOutput);
    if (tagList.length > 0) {
        console.log('(*) Image version has already been published.')
        return true;
    }
    console.log('(*) Image version has not been published yet.')
    return false;
}