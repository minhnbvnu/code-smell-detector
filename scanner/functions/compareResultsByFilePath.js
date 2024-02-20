function compareResultsByFilePath(a, b) {
        if (a.filePath < b.filePath) {
            return -1;
        }
        if (a.filePath > b.filePath) {
            return 1;
        }
        return 0;
    }