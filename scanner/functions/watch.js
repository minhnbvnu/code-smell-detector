function watch(plugin, src) {
    const srcStats = fs.statSync(src);
    if (srcStats.isFile()) {
        plugin.addWatchFile(path.resolve(__dirname, src));
        return;
    }
    const filesToWatch = fs.readdirSync(src);
    for (const file of filesToWatch) {
        const fullPath = path.join(src, file);
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
            plugin.addWatchFile(path.resolve(__dirname, fullPath));
        } else if (stats.isDirectory()) {
            watch(plugin, fullPath);
        }
    }
}