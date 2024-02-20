function isTypeSync(fsStatType, statsMethodName, filePath) {
        if (typeof filePath !== 'string') {
            throw new TypeError(`Expected a string, got ${typeof filePath}`);
        }
        try {
            return fs[fsStatType](filePath)[statsMethodName]();
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return false;
            }
            throw error;
        }
    }