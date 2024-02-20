function acquireRMacOS(version) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        // Download - a tool installer intimately knows how to get the tool (and construct urls)
        //
        let downloadUrl = version.url;
        let fileName = path.basename(downloadUrl);
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to download version ${version}: ${error}`;
        }
        //
        // Extract
        //
        let extPath = tempDirectory;
        if (!extPath) {
            throw new Error("Temp directory not set");
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
            throw `Failed to install R: ${error}`;
        }
        // Remove homebrew R from the PATH
        try {
            yield exec.exec("brew", ["unlink", "r"]);
        }
        catch (error) {
            core.debug(`${error}`);
        }
        // Older R versions on newer macOS cannot create a symlink to R and
        // Rscript, we'll need to do it manually.
        try {
            yield exec.exec("sudo ln", [
                "-sfv",
                "/Library/Frameworks/R.framework/Resources/bin/R",
                "/usr/local/bin/R"
            ]);
            yield exec.exec("sudo ln", [
                "-sfv",
                "/Library/Frameworks/R.framework/Resources/bin/Rscript",
                "/usr/local/bin/Rscript"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            core.debug("Marching on despite failed symlink creation.");
        }
        return "/";
    });
}