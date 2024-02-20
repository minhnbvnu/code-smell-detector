function directoryExists(resolvedPath) {
        try {
            return fs.statSync(resolvedPath).isDirectory();
        }
        catch (error) {
            if (error && (error.code === "ENOENT" || error.code === "ENOTDIR")) {
                return false;
            }
            throw error;
        }
    }