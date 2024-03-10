async function pushImage(definitionId, variant, repo, release, updateLatest,
    registry, registryPath, stubRegistry, stubRegistryPath, prepOnly, pushImages, replaceImage, secondaryRegistryPath) {
    const definitionPath = configUtils.getDefinitionPath(definitionId);
    const dotDevContainerPath = path.join(definitionPath, '.devcontainer');
    // Use Dockerfile for image build
    const dockerFilePath = path.join(dotDevContainerPath, 'Dockerfile');

    // Make sure there's a Dockerfile present
    if (!await asyncUtils.exists(dockerFilePath)) {
        throw `Definition ${definitionId} does not exist! Invalid path: ${definitionPath}`;
    }

    // Look for context in devcontainer.json and use it to build the Dockerfile
    console.log('(*) Reading devcontainer.json...');
    const devContainerJsonPath = path.join(dotDevContainerPath, 'devcontainer.json');
    const devContainerJsonRaw = await asyncUtils.readFile(devContainerJsonPath);
    const devContainerJson = jsonc.parse(devContainerJsonRaw);

    // Update common setup script download URL, SHA, parent tag if applicable
    console.log(`(*) Prep Dockerfile for ${definitionId} ${variant ? 'variant "' + variant + '"' : ''}...`);
    const prepResult = await prep.prepDockerFile(dockerFilePath,
        definitionId, repo, release, registry, registryPath, stubRegistry, stubRegistryPath, true, variant);

    if (prepOnly) {
        console.log(`(*) Skipping build and push to registry.`);
    } else {
        if (prepResult.shouldFlattenBaseImage) {
            console.log(`(*) Flattening base image...`);
            await flattenBaseImage(prepResult.baseImageTag, prepResult.flattenedBaseImageTag, pushImages);
        }

        // Build image
        console.log(`(*) Building image...`);
        // Determine tags to use
        const imageNamesWithVersionTags = configUtils.getTagList(definitionId, release, updateLatest, registry, registryPath, variant);
        const imageName = imageNamesWithVersionTags[0].split(':')[0];

        // Dual publish image to devcontainers and vscode/devcontainers
        const secondaryImageNamesWithVersionTags = configUtils.getTagList(definitionId, release, updateLatest, registry, secondaryRegistryPath, variant);

        console.log(`(*) Tags:${imageNamesWithVersionTags.reduce((prev, current) => prev += `\n     ${current}`, '')}`);
        console.log(`(*) Secondary Tags:${secondaryImageNamesWithVersionTags.reduce((prev, current) => prev += `\n     ${current}`, '')}`);

        const buildSettings = configUtils.getBuildSettings(definitionId);

        let architectures = buildSettings.architectures;
        switch (typeof architectures) {
            case 'string': architectures = [architectures]; break;
            case 'object': if (!Array.isArray(architectures)) { architectures = architectures[variant]; } break;
            case 'undefined': architectures = ['linux/amd64']; break;
        }

        console.log(`(*) Target image architectures: ${architectures.reduce((prev, current) => prev += `\n     ${current}`, '')}`);
        let localArchitecture = process.arch;
        switch (localArchitecture) {
            case 'arm': localArchitecture = 'linux/arm/v7'; break;
            case 'aarch32': localArchitecture = 'linux/arm/v7'; break;
            case 'aarch64': localArchitecture = 'linux/arm64'; break;
            case 'x64': localArchitecture = 'linux/amd64'; break;
            case 'x32': localArchitecture = 'linux/386'; break;
            default: localArchitecture = `linux/${localArchitecture}`; break;
        }

        console.log(`(*) Local architecture: ${localArchitecture}`);
        if (!pushImages) {
            console.log(`(*) Push disabled: Only building local architecture (${localArchitecture}).`);
        }

        if (replaceImage || !await isDefinitionVersionAlreadyPublished(definitionId, release, registry, registryPath, variant)) {

            let skipPersistingCustomizationsFromFeatures = false;
            let platformParams = "";
            // Universal image does not need to be multi-arch
            // ubuntu:focal image supports multiarch but Universal does not. Hence, the build fails similar to https://github.com/docker/buildx/issues/235
            if (definitionId !== "universal") {
                platformParams = "--platform " + (pushImages ? architectures.reduce((prev, current) => prev + ',' + current, '').substring(1) : localArchitecture)
            } else {
                skipPersistingCustomizationsFromFeatures = true;
            }

            const context = devContainerJson.build ? devContainerJson.build.context || '.' : devContainerJson.context || '.';
            const workingDir = path.resolve(dotDevContainerPath, context);
            let imageNameParams = imageNamesWithVersionTags.reduce((prev, current) => prev.concat(['--image-name', current]), []);

            const secondaryImageNameParams = secondaryImageNamesWithVersionTags.reduce((prev, current) => prev.concat(['--image-name', current]), []);
            imageNameParams = imageNameParams.concat(secondaryImageNameParams);

            const spawnOpts = { stdio: 'inherit', cwd: workingDir, shell: true };
            await asyncUtils.spawn('devcontainer', [
                'build',
                '--workspace-folder', definitionPath,
                '--log-level ', 'info',
                ...imageNameParams,
                '--no-cache', 'true',
                platformParams,
                pushImages ? '--push' : '',
                '--skip-persisting-customizations-from-features', skipPersistingCustomizationsFromFeatures,
            ], spawnOpts);

            if (!pushImages) {
                console.log(`(*) Skipping push to registry.`);
            }

            console.log("(*) Docker images", imageName);
            await asyncUtils.spawn('docker', [`images`], spawnOpts);

        } else {
            console.log(`(*) Version already published. Skipping.`);
        }
    }

    await prep.createStub(
        dotDevContainerPath, definitionId, repo, release, stubRegistry, stubRegistryPath);

    console.log('(*) Done!\n');
}