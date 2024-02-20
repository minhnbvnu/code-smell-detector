function acquireQpdfWindows(noqpdf) {
    return __awaiter(this, void 0, void 0, function* () {
        var pkgs = ["ghostscript"];
        if (noqpdf) {
            pkgs = pkgs.concat(["qpdf"]);
        }
        var args = ["install"].concat(pkgs).concat(["--no-progress"]);
        try {
            yield exec.exec("choco", args);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install qpdf: ${error}`;
        }
    });
}