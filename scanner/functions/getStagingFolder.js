async function getStagingFolder(release) {
    const stagingFolder = path.join(os.tmpdir(), 'dev-containers', release);
    console.log(`(*) Copying files to ${stagingFolder}\n`);
    await asyncUtils.rimraf(stagingFolder); // Clean out folder if it exists
    await asyncUtils.mkdirp(stagingFolder); // Create the folder
    await asyncUtils.copyFiles(
        path.resolve(__dirname, '..', '..', '..'),
        getConfig('filesToStage'),
        stagingFolder);
    
    stagingFolders[release] = stagingFolder;
    return stagingFolders[release];
}