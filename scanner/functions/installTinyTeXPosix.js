function installTinyTeXPosix() {
    return __awaiter(this, void 0, void 0, function* () {
        // We need to install texinfo for texi2dvi, but only on linux
        if (IS_LINUX) {
            try {
                yield exec.exec("sudo apt-get", ["install", "-y", "texinfo"]);
            }
            catch (error) {
                throw `Failed to install texinfo package: ${error}`;
            }
        }
        const fileName = "install-unx.sh";
        const downloadUrl = "https://yihui.name/gh/tinytex/tools/install-bin-unix.sh";
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
        }
        catch (error) {
            throw `Failed to download TinyTeX: ${error}`;
        }
        try {
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
            yield exec.exec("sh", [path.join(tempDirectory, fileName)]);
        }
        catch (error) {
            throw `Failed to install TinyTeX: ${error}`;
        }
        let binPath;
        // The binaries are in TinyTeX/bin/*/, where the wildcard is the
        // architecture, but we should always take the first one.
        if (IS_MAC) {
            binPath = path.join(process.env["HOME"] || "/", "Library/TinyTeX/bin");
        }
        else {
            binPath = path.join(process.env["HOME"] || "/", ".TinyTeX/bin");
        }
        const arch = fs.readdirSync(binPath)[0];
        core.addPath(path.join(binPath, arch));
    });
}