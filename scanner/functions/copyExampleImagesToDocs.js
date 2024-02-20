async function copyExampleImagesToDocs() {
    const dirFiles = await fse.readdir(exampleImagesSrcDir);
    await Promise.all(dirFiles.map(async (filePath) => {
        await fse.copy(
            path.resolve(exampleImagesSrcDir, filePath),
            path.resolve(exampleImagesDstDir, filePath)
        );
        console.log(`Copied ${filePath} to docs examples' image folder`);
    }));
}