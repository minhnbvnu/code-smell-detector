function readdirSafeSync(directoryPath) {
        try {
            return fs.readdirSync(directoryPath, { withFileTypes: true });
        }
        catch (error) {
            /* c8 ignore next */
            if (error.code !== "ENOENT") {
                throw error;
            }
            return [];
        }
    }