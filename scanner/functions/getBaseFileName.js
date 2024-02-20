function getBaseFileName(path, extensions, ignoreCase) {
            path = normalizeSlashes(path);
            const rootLength = getRootLength(path);
            if (rootLength === path.length)
                return "";
            path = removeTrailingDirectorySeparator(path);
            const name = path.slice(Math.max(getRootLength(path), path.lastIndexOf(directorySeparator) + 1));
            const extension = extensions !== void 0 && ignoreCase !== void 0 ? getAnyExtensionFromPath(name, extensions, ignoreCase) : void 0;
            return extension ? name.slice(0, name.length - extension.length) : name;
        }