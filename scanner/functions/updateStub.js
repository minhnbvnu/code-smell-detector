async function updateStub(dotDevContainerPath, definitionId, repo, release, registry, registryPath) {
    console.log('(*) Updating user Dockerfile...');
    const userDockerFilePath = path.join(dotDevContainerPath, 'Dockerfile');
    const userDockerFile = await asyncUtils.readFile(userDockerFilePath);
    const userDockerFileModified = await processStub(userDockerFile, definitionId, repo, release, registry, registryPath);
    await asyncUtils.writeFile(userDockerFilePath, userDockerFileModified);
}