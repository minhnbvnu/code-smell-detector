async function getDefinitionImageContent(repo, release, registry, registryPath, stubRegistry, stubRegistryPath, definitionId, alreadyRegistered, buildFirst) {
    const dependencies = configUtils.getDefinitionDependencies(definitionId);
    if (typeof dependencies !== 'object') {
        return [];
    }

    let registrations = [];


    const variants = configUtils.getVariants(definitionId) || [null];
    const version = configUtils.getVersionFromRelease(release, definitionId);

    // Create header for markdown
    let markdown = await generateReleaseNotesHeader(repo, release, definitionId, variants, dependencies);

    await asyncUtils.forEach(variants, async (variant) => {
        if(variant) {
            console.log(`\n(*) Processing variant ${variant}...`);
        }

        const imageTag = configUtils.getTagsForVersion(definitionId, version, registry, registryPath, variant)[0];
        if (buildFirst) {
            // Build but don't push images
            console.log('(*) Building image...');
            await push(repo, release, false, registry, registryPath, registry, registryPath, false, false, [], 1, 1, false, definitionId);
        } else {
            console.log(`(*) Pulling image ${imageTag}...`);
            await asyncUtils.spawn('docker', ['pull', imageTag]);
        }

        // Extract content information
        const contents = await imageContentUtils.getAllContentInfo(imageTag, dependencies, definitionId);
        
        // Update markdown content
        markdown = markdown + await generateReleaseNotesPart(contents, release, stubRegistry, stubRegistryPath, definitionId, variant);

        // Add to registrations
        registrations = registrations.concat(getUniqueComponents(alreadyRegistered, contents));
    });

    // Register upstream images
    await asyncUtils.forEach(dependencies.imageVariants, (async (imageTag) => {
        if (typeof alreadyRegistered[imageTag] === 'undefined') {
            const [image, imageVersion] = imageTag.split(':');
            registrations.push({
                "Component": {
                    "Type": "other",
                    "Other": {
                        "Name": `Docker Image: ${image}`,
                        "Version": imageVersion,
                        "DownloadUrl": dependencies.imageLink
                    }
                }
            });
            alreadyRegistered[dependencies.image] = [imageVersion];
        }
    }));

    return {
        registrations: registrations,
        markdown: markdown,
        version: version
    }
}