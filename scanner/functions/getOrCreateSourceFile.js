function getOrCreateSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
                    return getOrCreateSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), languageVersionOrOptions, onError, shouldCreateNewSourceFile);
                }