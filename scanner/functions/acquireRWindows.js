function acquireRWindows(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileName = path.basename(version.url);
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(version.url);
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to download version ${version}: ${error}`;
        }
        //
        // Install
        //
        let extPath = tempDirectory;
        if (!extPath) {
            throw new Error("Temp directory not set");
        }
        try {
            yield exec.exec(path.join(tempDirectory, fileName), [
                "/VERYSILENT",
                "/SUPPRESSMSGBOXES",
                "/DIR=C:\\R"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install R: ${error}`;
        }
        core.addPath(`C:\\R\\bin`);
        return "";
    });
}