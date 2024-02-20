function statSafeSync(filePath) {
        try {
            return fs.statSync(filePath);
        }
        catch (error) {
            /* c8 ignore next */
            if (error.code !== "ENOENT") {
                throw error;
            }
            return null;
        }
    }