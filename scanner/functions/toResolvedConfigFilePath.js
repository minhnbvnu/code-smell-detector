function toResolvedConfigFilePath(state, fileName) {
            const { resolvedConfigFilePaths } = state;
            const path = resolvedConfigFilePaths.get(fileName);
            if (path !== void 0)
                return path;
            const resolvedPath = toPath2(state, fileName);
            resolvedConfigFilePaths.set(fileName, resolvedPath);
            return resolvedPath;
        }