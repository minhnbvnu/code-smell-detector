function acquireUtilsMacOS() {
    return __awaiter(this, void 0, void 0, function* () {
        // qpdf is needed by `--as-cran`
        try {
            yield exec.exec("brew", ["install", "qpdf", "pkgconfig", "checkbashisms", "ghostscript"]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install qpdf: ${error}`;
        }
    });
}