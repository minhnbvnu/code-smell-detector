function getPathComponents(path, currentDirectory = "") {
            path = combinePaths(currentDirectory, path);
            return pathComponents(path, getRootLength(path));
        }