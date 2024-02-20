async function generateImageInformationFiles(repo, release, registry, registryPath, 
    stubRegistry, stubRegistryPath, buildFirst, pruneBetweenDefinitions, generateManifest, generateMarkdown, overwrite, outputPath, definitionId) {
    // Load config files
    await configUtils.loadConfig();

    const alreadyRegistered = {};
    const manifest = {
        "Registrations": [],
        "Version": 1
    }

    // manifest file path and whether it exists
    const manifestPath = path.join(outputPath, 'cgmanifest.json');
    const manifestExists = await asyncUtils.exists(manifestPath);

    console.log('(*) Generating image information files...');
    const definitions = definitionId ? [definitionId] : configUtils.getDefinitionList();
    await asyncUtils.forEach(definitions, async (currentDefinitionId) => {
        // Target file paths and whether they exist
        const definitionRelativePath = configUtils.getDefinitionPath(currentDefinitionId, true);
        const historyFolder = path.join(outputPath, definitionRelativePath, configUtils.getConfig('historyFolderName', 'history'));
        const version = configUtils.getVersionFromRelease(release, currentDefinitionId);
        const markdownPath = path.join(historyFolder, `${version}.md`);
        const markdownExists = await asyncUtils.exists(markdownPath);

        // Skip if not overwriting and all files exist
        if(! overwrite && 
            (! generateMarkdown || markdownExists) && 
            (! generateManifest || manifestExists)) {
            console.log(`(*) Skipping ${currentDefinitionId}. Not in overwrite mode and content already exists.`);
            return;
        }

        // Extract information
        const definitionInfo = await getDefinitionImageContent(repo, release, registry, registryPath,  stubRegistry, stubRegistryPath, currentDefinitionId, alreadyRegistered, buildFirst);

        // Write markdown file as appropriate
        if (generateMarkdown && (overwrite || ! markdownExists)) {
            console.log('(*) Writing image history markdown...');
            await asyncUtils.mkdirp(historyFolder);
            await asyncUtils.writeFile(markdownPath, definitionInfo.markdown);    
        }

        // Add component registrations if we're using them
        if (generateManifest) {
            manifest.Registrations = manifest.Registrations.concat(definitionInfo.registrations);     
        }
        // Prune images if setting enabled
        if (pruneBetweenDefinitions) {
            await asyncUtils.spawn('docker', ['image', 'prune', '-a', '-f']);
        }
    });

    // Write final cgmanifest.json file if needed
    if(generateManifest && (overwrite || ! manifestExists)) {
        console.log('(*) Writing cgmanifest.json...');
        await asyncUtils.writeFile(
            path.join(outputPath, 'cgmanifest.json'),
            JSON.stringify(manifest, undefined, 4));    
    }
    console.log('(*) Done!');    
}