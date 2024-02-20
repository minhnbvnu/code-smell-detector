function processResolution(cache, resolution) {
                if (!resolution || !resolution.originalPath || !resolution.resolvedFileName)
                    return;
                const { resolvedFileName, originalPath } = resolution;
                cache.setSymlinkedFile(toPath(originalPath, cwd, getCanonicalFileName), resolvedFileName);
                const [commonResolved, commonOriginal] = guessDirectorySymlink(resolvedFileName, originalPath, cwd, getCanonicalFileName) || emptyArray;
                if (commonResolved && commonOriginal) {
                    cache.setSymlinkedDirectory(commonOriginal, { real: commonResolved, realPath: toPath(commonResolved, cwd, getCanonicalFileName) });
                }
            }