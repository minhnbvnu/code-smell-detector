function installTinyTeXWindows() {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = "install-windows.bat";
        const downloadUrl = "https://yihui.name/gh/tinytex/tools/install-bin-windows.bat";
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
        }
        catch (error) {
            throw `Failed to download TinyTeX: ${error}`;
        }
        yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        const fs = require("fs");
        console.log(path.join(tempDirectory, fileName));
        var text = fs.readFileSync(path.join(tempDirectory, fileName), "utf8");
        var textWithoutLastLine = text
            .split("\n")
            .slice(0, -2)
            .join("\n");
        fs.writeFile(path.join(tempDirectory, fileName), textWithoutLastLine, function (err, result) {
            if (err)
                console.log("error", err);
        });
        try {
            exec.exec(path.join(tempDirectory, fileName));
        }
        catch (error) {
            throw `Failed to install TinyTeX: ${error}`;
        }
        const binDir = "win32";
        let winBin = path.join(process.env["APPDATA"] || "C:\\", "TinyTeX", "bin");
        winBin = fs.existsSync(path.join(winBin, binDir)) ?
            path.join(winBin, binDir) :
            path.join(winBin, "windows");
        core.addPath(winBin);
    });
}