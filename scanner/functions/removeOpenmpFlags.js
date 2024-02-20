function removeOpenmpFlags() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exec.exec("sed", [
                "-i",
                ".bak",
                "-e",
                "s/-fopenmp//g",
                "/Library/Frameworks/R.framework/Resources/etc/Makeconf"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to remove OpenMP flags: ${error}`;
        }
    });
}