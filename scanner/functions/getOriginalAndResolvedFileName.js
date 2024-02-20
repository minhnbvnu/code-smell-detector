function getOriginalAndResolvedFileName(fileName, host, traceEnabled) {
            const resolvedFileName = realPath(fileName, host, traceEnabled);
            const pathsAreEqual = arePathsEqual(fileName, resolvedFileName, host);
            return {
                // If the fileName and realpath are differing only in casing prefer fileName so that we can issue correct errors for casing under forceConsistentCasingInFileNames
                resolvedFileName: pathsAreEqual ? fileName : resolvedFileName,
                originalPath: pathsAreEqual ? void 0 : fileName
            };
        }