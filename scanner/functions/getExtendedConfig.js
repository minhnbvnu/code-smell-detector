function getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, errors, extendedConfigCache, result) {
            var _a2;
            const path = host.useCaseSensitiveFileNames ? extendedConfigPath : toFileNameLowerCase(extendedConfigPath);
            let value;
            let extendedResult;
            let extendedConfig;
            if (extendedConfigCache && (value = extendedConfigCache.get(path))) {
                ({ extendedResult, extendedConfig } = value);
            }
            else {
                extendedResult = readJsonConfigFile(extendedConfigPath, (path2) => host.readFile(path2));
                if (!extendedResult.parseDiagnostics.length) {
                    extendedConfig = parseConfig(
                    /*json*/
                    void 0, extendedResult, host, getDirectoryPath(extendedConfigPath), getBaseFileName(extendedConfigPath), resolutionStack, errors, extendedConfigCache);
                }
                if (extendedConfigCache) {
                    extendedConfigCache.set(path, { extendedResult, extendedConfig });
                }
            }
            if (sourceFile) {
                ((_a2 = result.extendedSourceFiles) != null ? _a2 : result.extendedSourceFiles = /* @__PURE__ */ new Set()).add(extendedResult.fileName);
                if (extendedResult.extendedSourceFiles) {
                    for (const extenedSourceFile of extendedResult.extendedSourceFiles) {
                        result.extendedSourceFiles.add(extenedSourceFile);
                    }
                }
            }
            if (extendedResult.parseDiagnostics.length) {
                errors.push(...extendedResult.parseDiagnostics);
                return void 0;
            }
            return extendedConfig;
        }