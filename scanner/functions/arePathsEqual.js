function arePathsEqual(path1, path2, host) {
            const useCaseSensitiveFileNames = typeof host.useCaseSensitiveFileNames === "function" ? host.useCaseSensitiveFileNames() : host.useCaseSensitiveFileNames;
            return comparePaths(path1, path2, !useCaseSensitiveFileNames) === 0 /* EqualTo */;
        }