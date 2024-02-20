async function createStub(dotDevContainerPath, definitionId, repo, release, stubRegistry, stubRegistryPath) {
    const userDockerFilePath = path.join(dotDevContainerPath, 'Dockerfile');
    console.log('(*) Generating user Dockerfile...');
    const templateDockerfile = await configUtils.objectByDefinitionLinuxDistro(definitionId, stubPromises);
    const userDockerFile = await processStub(templateDockerfile, definitionId, repo, release, stubRegistry, stubRegistryPath);
    await asyncUtils.writeFile(userDockerFilePath, userDockerFile);
}