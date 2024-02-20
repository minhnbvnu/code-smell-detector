function getCanonicalFileName(filePath) {
        let normalized = path_1.default.normalize(filePath);
        if (normalized.endsWith(path_1.default.sep)) {
            normalized = normalized.slice(0, -1);
        }
        return correctPathCasing(normalized);
    }