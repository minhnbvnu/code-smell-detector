function acquireFortranMacOSNew() {
    return __awaiter(this, void 0, void 0, function* () {
        let downloadUrl = "https://github.com/r-hub/mac-tools/releases/download/tools/gfortran-12.2-universal.pkg";
        let fileName = path.basename(downloadUrl);
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to download gfortran: ${error}`;
        }
        try {
            yield exec.exec("sudo", [
                "installer",
                "-allowUntrusted",
                "-dumplog",
                "-pkg",
                path.join(tempDirectory, fileName),
                "-target",
                "/"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install gfortran: ${error}`;
        }
        core.addPath("/opt/gfortran/bin");
        return "/";
    });
}