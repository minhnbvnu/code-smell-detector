async function updateConfigForRelease(definitionId, repo, release, registry, registryPath, stubRegistry, stubRegistryPath) {
    // Look for context in devcontainer.json and use it to build the Dockerfile
    console.log(`(*) Making version specific updates to ${definitionId}...`);
    const definitionPath = configUtils.getDefinitionPath(definitionId, false);
    const relativePath = configUtils.getDefinitionPath(definitionId, true);
    const dotDevContainerPath = path.join(definitionPath, '.devcontainer');
    const devContainerJsonPath = path.join(dotDevContainerPath, 'devcontainer.json');
    const devContainerJsonRaw = await asyncUtils.readFile(devContainerJsonPath);
    const devContainerJsonModified =
        `// ${configUtils.getConfig('devContainerJsonPreamble')}https://github.com/${repo}/tree/${release}/${relativePath}\n` +
        devContainerJsonRaw;
    await asyncUtils.writeFile(devContainerJsonPath, devContainerJsonModified);

    // Replace version specific content in Dockerfile
    const dockerFilePath = path.join(dotDevContainerPath, 'Dockerfile');
    if (await asyncUtils.exists(dockerFilePath)) {
        await prepDockerFile(dockerFilePath, definitionId, repo, release, registry, registryPath, stubRegistry, stubRegistryPath, false);
    }
}