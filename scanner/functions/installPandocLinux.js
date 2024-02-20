function installPandocLinux(version) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = util.format("pandoc-%s-1-amd64.deb", version);
        const downloadUrl = util.format("https://github.com/jgm/pandoc/releases/download/%s/%s", version, fileName);
        let downloadPath;
        try {
            console.log("::group::Download pandoc");
            downloadPath = yield tc.downloadTool(downloadUrl);
        }
        catch (error) {
            throw new Error(`Failed to download Pandoc ${version}: ${error}`);
        }
        yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        try {
            console.log("::group::Install gdebi-core");
            yield exec.exec("sudo apt-get", ["install", "-y", "gdebi-core"]);
            console.log("::group::Install pandoc");
            yield exec.exec("sudo gdebi", [
                "--non-interactive",
                path.join(tempDirectory, fileName)
            ]);
        }
        catch (error) {
            throw new Error(`Failed to install pandoc: ${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error}`);
        }
        console.log("::endgroup::");
    });
}