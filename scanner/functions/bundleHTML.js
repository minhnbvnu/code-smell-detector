async function bundleHTML(inputDir, outputDir, deleteDir = true, watch = false, filter) {
    generateSite(inputDir, outputDir, deleteDir, filter);
    if (!watch) return;

    const watcher = chokidar.watch(inputDir, { ignored: /(^|[\/\\])\../ });
    let initialScan = true;
    watcher.on("ready", () => (initialScan = false));
    watcher.on("all", (event, filePath) => {
        if (initialScan) return;
        if (path.resolve(filePath).startsWith(path.resolve(outputDir))) return;
        console.log(`File ${filePath} has been ${event}`);
        generateSite(inputDir, outputDir, false, filter);
    });
    console.log(`Watching directory for changes: ${inputDir}`);
}