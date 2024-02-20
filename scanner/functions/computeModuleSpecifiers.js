function computeModuleSpecifiers(modulePaths, compilerOptions, importingSourceFile, host, userPreferences, options = {}) {
            const info = getInfo(importingSourceFile.path, host);
            const preferences = getPreferences(userPreferences, compilerOptions, importingSourceFile);
            const existingSpecifier = forEach(modulePaths, (modulePath) => forEach(host.getFileIncludeReasons().get(toPath(modulePath.path, host.getCurrentDirectory(), info.getCanonicalFileName)), (reason) => {
                if (reason.kind !== 3 /* Import */ || reason.file !== importingSourceFile.path)
                    return void 0;
                if (importingSourceFile.impliedNodeFormat && importingSourceFile.impliedNodeFormat !== getModeForResolutionAtIndex(importingSourceFile, reason.index))
                    return void 0;
                const specifier = getModuleNameStringLiteralAt(importingSourceFile, reason.index).text;
                return preferences.relativePreference !== 1 /* NonRelative */ || !pathIsRelative(specifier) ? specifier : void 0;
            }));
            if (existingSpecifier) {
                const moduleSpecifiers = [existingSpecifier];
                return moduleSpecifiers;
            }
            const importedFileIsInNodeModules = some(modulePaths, (p) => p.isInNodeModules);
            let nodeModulesSpecifiers;
            let pathsSpecifiers;
            let redirectPathsSpecifiers;
            let relativeSpecifiers;
            for (const modulePath of modulePaths) {
                const specifier = modulePath.isInNodeModules ? tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, userPreferences, 
                /*packageNameOnly*/
                void 0, options.overrideImportMode) : void 0;
                nodeModulesSpecifiers = append(nodeModulesSpecifiers, specifier);
                if (specifier && modulePath.isRedirect) {
                    return nodeModulesSpecifiers;
                }
                if (!specifier) {
                    const local = getLocalModuleSpecifier(modulePath.path, info, compilerOptions, host, options.overrideImportMode || importingSourceFile.impliedNodeFormat, preferences, 
                    /*pathsOnly*/
                    modulePath.isRedirect);
                    if (!local) {
                        continue;
                    }
                    if (modulePath.isRedirect) {
                        redirectPathsSpecifiers = append(redirectPathsSpecifiers, local);
                    }
                    else if (pathIsBareSpecifier(local)) {
                        pathsSpecifiers = append(pathsSpecifiers, local);
                    }
                    else if (!importedFileIsInNodeModules || modulePath.isInNodeModules) {
                        relativeSpecifiers = append(relativeSpecifiers, local);
                    }
                }
            }
            return (pathsSpecifiers == null ? void 0 : pathsSpecifiers.length) ? pathsSpecifiers : (redirectPathsSpecifiers == null ? void 0 : redirectPathsSpecifiers.length) ? redirectPathsSpecifiers : (nodeModulesSpecifiers == null ? void 0 : nodeModulesSpecifiers.length) ? nodeModulesSpecifiers : Debug.checkDefined(relativeSpecifiers);
        }