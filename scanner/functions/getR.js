function getR(version) {
    return __awaiter(this, void 0, void 0, function* () {
        const selected = yield determineVersion(version);
        var ok = false;
        if (!!process.env.RUNNER_TOOL_CACHE) {
            let toolPath = tc.find("R", selected.version);
            if (toolPath) {
                ok = true;
                core.debug(`Tool found in cache ${toolPath}`);
            }
        }
        if (!ok) {
            try {
                yield acquireR(selected);
            }
            catch (error) {
                core.debug(`${error}`);
                throw `Failed to get R ${version}: ${error}`;
            }
        }
        setREnvironmentVariables();
        setupRLibrary();
        core.setOutput("installed-r-version", selected.version);
    });
}