function acquireFortranMacOSOld() {
    return __awaiter(this, void 0, void 0, function* () {
        let gfortran = "gfortran-8.2-Mojave";
        let mntPath = path.join("/Volumes", gfortran);
        let fileName = `${gfortran}.dmg`;
        let downloadUrl = `https://github.com/r-hub/mac-tools/releases/download/tools/${fileName}`;
        let downloadPath = null;
        try {
            downloadPath = yield tc.downloadTool(downloadUrl);
            yield io.mv(downloadPath, path.join(tempDirectory, fileName));
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to download ${downloadUrl}: ${error}`;
        }
        try {
            yield exec.exec("sudo", [
                "hdiutil",
                "attach",
                path.join(tempDirectory, fileName)
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to mount ${fileName}: ${error}`;
        }
        try {
            yield exec.exec("sudo", [
                "installer",
                "-allowUntrusted",
                "-dumplog",
                "-package",
                path.join(mntPath, gfortran, "gfortran.pkg"),
                "-target",
                "/"
            ]);
        }
        catch (error) {
            core.debug(`${error}`);
            throw `Failed to install gfortran: ${error}`;
        }
        // We do not detach the volume here, because it might lead to hangs
        core.addPath("/usr/local/gfortran/bin");
        // rename the gcov executable shipped with gfortran, as it conflits with the
        // normal gcov executable in llvm, and we cannot append paths to PATH
        // currently https://github.com/actions/toolkit/issues/270
        yield exec.exec("sudo", [
            "mv",
            "/usr/local/gfortran/bin/gcov",
            "/usr/local/gfortran/bin/gcov-fortran"
        ]);
        return "/";
    });
}