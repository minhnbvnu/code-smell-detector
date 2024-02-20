function getExtendsConfigPath(extendedConfig, host, basePath, errors, createDiagnostic) {
            extendedConfig = normalizeSlashes(extendedConfig);
            if (isRootedDiskPath(extendedConfig) || startsWith(extendedConfig, "./") || startsWith(extendedConfig, "../")) {
                let extendedConfigPath = getNormalizedAbsolutePath(extendedConfig, basePath);
                if (!host.fileExists(extendedConfigPath) && !endsWith(extendedConfigPath, ".json" /* Json */)) {
                    extendedConfigPath = `${extendedConfigPath}.json`;
                    if (!host.fileExists(extendedConfigPath)) {
                        errors.push(createDiagnostic(Diagnostics.File_0_not_found, extendedConfig));
                        return void 0;
                    }
                }
                return extendedConfigPath;
            }
            const resolved = nodeNextJsonConfigResolver(extendedConfig, combinePaths(basePath, "tsconfig.json"), host);
            if (resolved.resolvedModule) {
                return resolved.resolvedModule.resolvedFileName;
            }
            if (extendedConfig === "") {
                errors.push(createDiagnostic(Diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "extends"));
            }
            else {
                errors.push(createDiagnostic(Diagnostics.File_0_not_found, extendedConfig));
            }
            return void 0;
        }