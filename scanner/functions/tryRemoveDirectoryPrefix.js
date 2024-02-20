function tryRemoveDirectoryPrefix(path, dirPath, getCanonicalFileName) {
            const withoutPrefix = tryRemovePrefix(path, dirPath, getCanonicalFileName);
            return withoutPrefix === void 0 ? void 0 : stripLeadingDirectorySeparator(withoutPrefix);
        }