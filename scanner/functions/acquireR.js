function acquireR(version) {
    return __awaiter(this, void 0, void 0, function* () {
        if (core.getInput("install-r") !== "true") {
            return;
        }
        try {
            if (IS_WINDOWS) {
                yield Promise.all([
                    yield acquireRWindows(version),
                    yield acquireRtools(version)
                ]);
            }
            else if (IS_MAC) {
                yield core.group('Downloading gfortran', () => __awaiter(this, void 0, void 0, function* () { yield acquireFortranMacOS(version.version); }));
                yield core.group('Downloading macOS utils', () => __awaiter(this, void 0, void 0, function* () { yield acquireUtilsMacOS(); }));
                yield core.group('Downloading R', () => __awaiter(this, void 0, void 0, function* () { yield acquireRMacOS(version); }));
                if (core.getInput("remove-openmp-macos") === "true") {
                    yield core.group('Patching -fopenmp', () => __awaiter(this, void 0, void 0, function* () { yield removeOpenmpFlags(); }));
                }
            }
            else {
                yield acquireRUbuntu(version);
            }
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to get R ${version.version}: ${error}`;
        }
        // version.rtools_cersion is always trithy on Windows, but typescript
        // does not know that
        if (IS_WINDOWS && version.rtools) {
            const rtoolsVersionNumber = parseInt(version.rtools);
            const noqpdf = rtoolsVersionNumber >= 41;
            var tries_left = 10;
            var ok = false;
            while (!ok && tries_left > 0) {
                try {
                    yield acquireQpdfWindows(noqpdf);
                    ok = true;
                }
                catch (error) {
                    core.warning(`Failed to download qpdf or ghostscript: ${error}`);
                    yield new Promise(f => setTimeout(f, 10000));
                    tries_left = tries_left - 1;
                }
            }
            if (!ok) {
                throw `Failed to get qpdf and ghostscript in 10 tries :(`;
            }
            let gspath = "c:\\program files\\gs\\" +
                fs.readdirSync("c:\\program files\\gs") +
                "\\bin";
            core.addPath(gspath);
        }
    });
}