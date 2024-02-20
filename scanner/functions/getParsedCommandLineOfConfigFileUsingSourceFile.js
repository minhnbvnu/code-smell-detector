function getParsedCommandLineOfConfigFileUsingSourceFile(configFileName) {
                    const result = getOrCreateSourceFile(configFileName, 100 /* JSON */);
                    if (!result)
                        return void 0;
                    result.path = toPath(configFileName, currentDirectory, getCanonicalFileName);
                    result.resolvedPath = result.path;
                    result.originalFileName = result.fileName;
                    return parseJsonSourceFileConfigFileContent(result, parseConfigHost, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), 
                    /*optionsToExtend*/
                    void 0, getNormalizedAbsolutePath(configFileName, currentDirectory));
                }