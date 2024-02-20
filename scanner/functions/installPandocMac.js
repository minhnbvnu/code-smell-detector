function installPandocMac(version) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Since 3.1.2, Pandoc uses cabal instead of stack to build the macOS binary.
        const is_new_macos_installer = (0, compare_versions_1.compare)(version, "3.1.2", ">=") ? true : false;
        const fileName = is_new_macos_installer ? util.format("pandoc-%s-x86_64-macOS.pkg", version) : util.format("pandoc-%s-macOS.pkg", version);
        const downloadUrl = util.format("https://github.com/jgm/pandoc/releases/download/%s/%s", version, fileName);
        let downloadPath;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
        }
        catch (error) {
            throw new Error(`Failed to download Pandoc ${version}: ${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error}`);
        }
        yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        exec.exec("sudo installer", [
            "-allowUntrusted",
            "-dumplog",
            "-pkg",
            path.join(tempDirectory, fileName),
            "-target",
            "/"
        ]);
    });
}