function acquireRtools(version) {
    return __awaiter(this, void 0, void 0, function* () {
        var rtoolsVersion = "", downloadUrl = "";
        const inpver = core.getInput("rtools-version");
        if (inpver == "") {
            rtoolsVersion = version.rtools || 'error';
            ;
            downloadUrl = version.rtools_url || 'error';
        }
        else {
            rtoolsVersion = inpver;
            downloadUrl = getRtoolsUrl(rtoolsVersion);
        }
        const versionNumber = parseInt(rtoolsVersion || 'error');
        const rtools43 = versionNumber >= 43;
        const rtools42 = !rtools43 && versionNumber >= 41;
        const rtools40 = !rtools43 && !rtools42 && versionNumber >= 40;
        const rtools3x = !rtools43 && !rtools42 && !rtools40;
        var fileName = path.basename(downloadUrl);
        // If Rtools is already installed just return, as there is a message box
        // which hangs the build otherwise.
        if ((rtools43 && fs.existsSync("C:\\Rtools43")) ||
            (rtools42 && fs.existsSync("C:\\Rtools42")) ||
            (rtools40 && fs.existsSync("C:\\Rtools40")) ||
            (rtools3x && fs.existsSync("C:\\Rtools"))) {
            core.debug("Skipping Rtools installation as a suitable Rtools is already installed");
        }
        else {
            console.log(`Downloading ${downloadUrl}...`);
            let downloadPath = null;
            try {
                downloadPath = yield tc.downloadTool(downloadUrl);
                yield io.mv(downloadPath, path.join(tempDirectory, fileName));
            }
            catch (error) {
                core.debug(`${error}`);
                throw `Failed to download version ${version}: ${error}`;
            }
            try {
                yield exec.exec(path.join(tempDirectory, fileName), [
                    "/VERYSILENT",
                    "/SUPPRESSMSGBOXES"
                ]);
            }
            catch (error) {
                core.debug(`${error}`);
                throw `Failed to install Rtools: ${error}`;
            }
        }
        // we never want patches (by default)
        let addpath = core.getInput("windows-path-include-rtools") === "true";
        core.exportVariable("_R_INSTALL_TIME_PATCHES_", "no");
        if (rtools43) {
            if (addpath) {
                core.addPath(`C:\\rtools43\\usr\\bin`);
                core.addPath(`C:\\rtools43\\x86_64-w64-mingw32.static.posix\\bin`);
            }
        }
        else if (rtools42) {
            if (addpath) {
                core.addPath(`C:\\rtools42\\usr\\bin`);
                core.addPath(`C:\\rtools42\\x86_64-w64-mingw32.static.posix\\bin`);
            }
        }
        else if (rtools40) {
            if (addpath) {
                core.addPath(`C:\\rtools40\\usr\\bin`);
                // If we use Rtools40 and R 4.2.0 or later, then we need to add this
                // to the path, because GHA might put a different gcc on the PATH,
                // and R 4.2.x picks that up. We do this for R-devel, R-next and
                // every numeric version that is not 4.0.x and 4.1.x. (For 3.x.y
                // Rtools3.x is selected.) Issue #610.
                if (semver.gte(version.version, "4.2.0")) {
                    core.addPath(`C:\\rtools40\\ucrt64\\bin`);
                }
            }
            if (core.getInput("update-rtools") === "true") {
                try {
                    yield exec.exec("c:\\rtools40\\usr\\bin\\bash.exe", [
                        "--login",
                        "-c",
                        "pacman -Syu --noconfirm"
                    ]);
                }
                catch (error) {
                    core.debug(`${error}`);
                    throw `Failed to update rtools40 libraries: ${error}`;
                }
            }
        }
        else { // rtools3x
            if (addpath) {
                core.addPath(`C:\\Rtools\\bin`);
                if (core.getInput("windows-path-include-mingw") === "true") {
                    core.addPath(`C:\\Rtools\\mingw_64\\bin`);
                }
            }
        }
    });
}