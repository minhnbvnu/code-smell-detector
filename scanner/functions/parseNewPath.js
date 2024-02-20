function parseNewPath(inputPath, callback) {
        let path = inputPath;
        const parsedPath = {};
        const fileRoot = config.options.fileRoot || '';
        parsedPath.uiPath = path;

        // if the passed in path isn't in the fileRoot path, make it so
        // This should go away and every path should be relative to the fileRoot
        if (path.substring(0, fileRoot.length) !== fileRoot) {
            path = paths.posix.join(fileRoot, path);
        }

        parsedPath.relativePath = paths.posix.normalize(path);
        parsedPath.filename = paths.posix.basename(parsedPath.relativePath);
        parsedPath.osRelativePath = paths.normalize(path);
        parsedPath.osExecutionPath = __appRoot;
        parsedPath.osFullPath = paths.join(parsedPath.osExecutionPath, parsedPath.osRelativePath);
        parsedPath.osFullDirectory = paths.parse(parsedPath.osFullPath).dir;
        callback(parsedPath);
    }