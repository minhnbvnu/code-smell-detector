function generateSite(inputDir, outputDir, deleteOutput, filter) {
    if (deleteOutput) {
        deleteDirectory(outputDir);
    }
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const files = fs.readdirSync(inputDir);
    files.forEach((file) => {
        const filePath = path.join(inputDir, file);
        const isDir = fs.statSync(filePath).isDirectory();
        if (file.startsWith("_")) return;

        if (isDir) {
            if (filter(filePath, true, null)) return;
            if (path.resolve(filePath) == path.resolve(outputDir)) return;
            const subOutputDir = path.join(outputDir, file);
            fs.mkdirSync(subOutputDir, { recursive: true });
            generateSite(filePath, subOutputDir, deleteOutput, filter);
        } else {
            const inputFile = filePath;
            const outputFile = path.join(outputDir, file);
            processFile(inputFile, outputFile, filter);
        }
    });
}