function filePathComponents(fullPath) {
        fullPath = switchToForwardSlashes(fullPath);
        var components = getPathComponents(fullPath);
        return components.slice(0, components.length - 1);
    }