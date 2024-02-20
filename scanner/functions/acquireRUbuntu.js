function acquireRUbuntu(version) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        // Download - a tool installer intimately knows how to get the tool (and construct urls)
        //
        let downloadUrl = version.url;
        let fileName = path.basename(downloadUrl);
        let downloadPath = null;
        core.startGroup('Downloading R');
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to download version ${version}: ${error}`;
        }
        core.endGroup();
        //
        // Install
        //
        let extPath = tempDirectory;
        if (!extPath) {
            throw new Error("Temp directory not set");
        }
        try {
            yield core.group('Updating system package data', () => __awaiter(this, void 0, void 0, function* () {
                yield exec.exec("sudo DEBIAN_FRONTEND=noninteractive apt-get update -y -qq");
            }));
            // install gdbi-core and also qpdf, which is used by `--as-cran`
            yield core.group('Installing R system requirements', () => __awaiter(this, void 0, void 0, function* () {
                yield exec.exec("sudo DEBIAN_FRONTEND=noninteractive apt-get install -y gdebi-core qpdf devscripts ghostscript");
            }));
            yield core.group("Installing R", () => __awaiter(this, void 0, void 0, function* () {
                yield exec.exec("sudo gdebi", [
                    "--non-interactive",
                    path.join(tempDirectory, fileName)
                ]);
            }));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install R: ${error}`;
        }
        //
        // Add symlinks to the installed R to the path
        //
        //
        let rdir = (version.type == "next" || version.type == "devel") ?
            version.type : version.version;
        try {
            yield exec.exec("sudo ln", [
                "-sf",
                path.join("/opt", "R", rdir, "bin", "R"),
                "/usr/local/bin/R"
            ]);
            yield exec.exec("sudo ln", [
                "-sf",
                path.join("/opt", "R", rdir, "bin", "Rscript"),
                "/usr/local/bin/Rscript"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to setup symlinks to R: ${error}`;
        }
        return "/usr/local/bin";
    });
}