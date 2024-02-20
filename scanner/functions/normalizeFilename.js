function normalizeFilename(filename) {
        const parts = filename.split(path.sep);
        const index = parts.lastIndexOf("<text>");
        return index === -1 ? filename : parts.slice(index).join(path.sep);
    }