function applyExtendedConfig(result, extendedConfigPath) {
                const extendedConfig = getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, errors, extendedConfigCache, result);
                if (extendedConfig && isSuccessfulParsedTsconfig(extendedConfig)) {
                    const extendsRaw = extendedConfig.raw;
                    let relativeDifference;
                    const setPropertyInResultIfNotUndefined = (propertyName) => {
                        if (extendsRaw[propertyName]) {
                            result[propertyName] = map(extendsRaw[propertyName], (path) => isRootedDiskPath(path) ? path : combinePaths(relativeDifference || (relativeDifference = convertToRelativePath(getDirectoryPath(extendedConfigPath), basePath, createGetCanonicalFileName(host.useCaseSensitiveFileNames))), path));
                        }
                    };
                    setPropertyInResultIfNotUndefined("include");
                    setPropertyInResultIfNotUndefined("exclude");
                    setPropertyInResultIfNotUndefined("files");
                    if (extendsRaw.compileOnSave !== void 0) {
                        result.compileOnSave = extendsRaw.compileOnSave;
                    }
                    assign(result.options, extendedConfig.options);
                    result.watchOptions = result.watchOptions && extendedConfig.watchOptions ? assign({}, result.watchOptions, extendedConfig.watchOptions) : result.watchOptions || extendedConfig.watchOptions;
                }
            }