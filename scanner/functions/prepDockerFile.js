async function prepDockerFile(devContainerDockerfilePath, definitionId, repo, release, registry, registryPath, stubRegistry, stubRegistryPath, isForBuild, variant) {
    const devContainerJsonPath = path.dirname(devContainerDockerfilePath);
    // Read Dockerfile
    const devContainerDockerfileRaw = await asyncUtils.readFile(devContainerDockerfilePath);
    // Use exact version of building, MAJOR if not
    const version = isForBuild ? configUtils.getVersionFromRelease(release, definitionId) : configUtils.majorFromRelease(release, definitionId);

    // Create initial result object 
    const prepResult = {
        shouldFlattenBaseImage: false,
        baseImage: null,
        flattenedBaseImage: null,
        devContainerDockerfileModified: await updateScriptSources(devContainerDockerfileRaw, repo, release, true),
        meta: {
            version: version,
            definitionId: definitionId,
            variant: variant,
            gitRepository: repositoryUrl,
            gitRepositoryRelease: release,
            contentsUrl: `${historyUrlPrefix}${definitionId}/${configUtils.getConfig('historyFolderName', 'history')}/${version}.md`,
            buildTimestamp: `${new Date().toUTCString()}`
        }
    };

    if (isForBuild) {
        if (prepResult.meta) {
            // Write meta.env
            const metaEnvTemplate = handlebars.compile(await asyncUtils.readFile(path.join(__dirname, '..', 'assets', 'meta.env')));
            await asyncUtils.writeFile(path.join(devContainerJsonPath, 'meta.env'), metaEnvTemplate(prepResult.meta));
            prepResult.devContainerDockerfileModified += '\n' +'COPY meta.env /usr/local/etc/vscode-dev-containers/' + '\n';
        }

        // If building, update FROM to target registry and version if image has a parent
        const parentTag = configUtils.getParentTagForVersion(definitionId, version, registry, registryPath, variant);
        if (parentTag) {
            prepResult.devContainerDockerfileModified = replaceFrom(prepResult.devContainerDockerfileModified, `FROM ${parentTag}`);
        }

        prepResult.shouldFlattenBaseImage = configUtils.shouldFlattenDefinitionBaseImage(definitionId);
        if (prepResult.shouldFlattenBaseImage) {
            // Determine base image
            const baseImageFromCaptureGroups = /FROM\s+(.+):([^\s\n]+)?/.exec(prepResult.devContainerDockerfileModified);
            let registryPath = baseImageFromCaptureGroups[1].replace('${VARIANT}', variant).replace('$VARIANT', variant);
            const tagName = (baseImageFromCaptureGroups.length > 2) ?
                baseImageFromCaptureGroups[2].replace('${VARIANT}', variant).replace('$VARIANT', variant) :
                null;
            prepResult.baseImageTag = registryPath + (tagName ? ':' + tagName : '');

            // Create tag for flattened image
            const registrySlashIndex = registryPath.indexOf('/');
            if (registrySlashIndex > -1) {
                registryPath = registryPath.substring(registrySlashIndex + 1);
            }
            prepResult.flattenedBaseImageTag = `${registry}/${registryPath}:${tagName ? tagName + '-' : ''}flattened`;

            // Modify Dockerfile contents to use flattened image tag
            prepResult.devContainerDockerfileModified = replaceFrom(prepResult.devContainerDockerfileModified, `FROM ${prepResult.flattenedBaseImageTag}`);
        }

        // Add variant as an argument to the dockerfile
        if (variant) {
            replaceVariantArg(prepResult);
        }

        // Generate list of other arguments if applicable and add to the dockefile
        addBuildArguments(prepResult);

        // Add custom metadata to the image by adding labels
        prepResult.devContainerDockerfileModified = addLabels(prepResult);
    } else {
        // Otherwise update any Dockerfiles that refer to an un-versioned tag of another dev container
        // to the MAJOR version from this release.
        const expectedRegistry = configUtils.getConfig('stubRegistry', 'mcr.microsoft.com');
        const expectedRegistryPath = configUtils.getConfig('stubRegistryPath', 'devcontainers');
        const fromCaptureGroups = new RegExp(`FROM\\s+(${expectedRegistry}/${expectedRegistryPath}/.+:.+)`).exec(devContainerDockerfileRaw);
        if (fromCaptureGroups && fromCaptureGroups.length > 0) {
            const fromDefinitionTag = configUtils.getUpdatedTag(
                fromCaptureGroups[1],
                expectedRegistry,
                expectedRegistryPath,
                version,
                stubRegistry,
                stubRegistryPath,
                variant);
            prepResult.devContainerDockerfileModified = prepResult.devContainerDockerfileModified
                .replace(fromCaptureGroups[0], `FROM ${fromDefinitionTag}`);
        }
    }

    await asyncUtils.writeFile(devContainerDockerfilePath, prepResult.devContainerDockerfileModified);
    return prepResult;
}