function installPandocWindows(version) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = util.format("pandoc-%s-windows-x86_64.zip", version);
        const downloadUrl = util.format("https://github.com/jgm/pandoc/releases/download/%s/%s", version, fileName);
        let downloadPath;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
        }
        catch (error) {
            throw new Error(`Failed to download Pandoc ${version}: ${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error}`);
        }
        //
        // Extract
        //
        let extPath = tempDirectory;
        if (!extPath) {
            throw new Error("Temp directory not set");
        }
        extPath = yield tc.extractZip(downloadPath);
        const toolPath = yield tc.cacheDir(extPath, "pandoc", version);
        // It extracts to this folder
        const toolRoot = path.join(toolPath, pandocSubdir(version));
        core.addPath(toolRoot);
    });
}