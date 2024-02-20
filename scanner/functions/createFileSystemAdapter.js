function createFileSystemAdapter(fsMethods) {
        if (fsMethods === undefined) {
            return exports.FILE_SYSTEM_ADAPTER;
        }
        return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
    }