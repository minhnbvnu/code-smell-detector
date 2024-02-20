function assertNonEmptyFilesArray(config) {
        if (!Array.isArray(config.files) || config.files.length === 0) {
            throw new TypeError('The files key must be a non-empty array.');
        }
    }