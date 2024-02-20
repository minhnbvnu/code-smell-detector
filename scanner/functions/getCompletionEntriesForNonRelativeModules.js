function getCompletionEntriesForNonRelativeModules(fragment, scriptPath, mode, compilerOptions, host, extensionOptions, typeChecker) {
            const { baseUrl, paths } = compilerOptions;
            const result = createNameAndKindSet();
            const moduleResolution = getEmitModuleResolutionKind(compilerOptions);
            if (baseUrl) {
                const projectDir = compilerOptions.project || host.getCurrentDirectory();
                const absolute = normalizePath(combinePaths(projectDir, baseUrl));
                getCompletionEntriesForDirectoryFragment(fragment, absolute, extensionOptions, host, 
                /*moduleSpecifierIsRelative*/
                false, 
                /*exclude*/
                void 0, result);
                if (paths) {
                    addCompletionEntriesFromPaths(result, fragment, absolute, extensionOptions, host, paths);
                }
            }
            const fragmentDirectory = getFragmentDirectory(fragment);
            for (const ambientName of getAmbientModuleCompletions(fragment, fragmentDirectory, typeChecker)) {
                result.add(nameAndKind(ambientName, "external module name" /* externalModuleName */, 
                /*extension*/
                void 0));
            }
            getCompletionEntriesFromTypings(host, compilerOptions, scriptPath, fragmentDirectory, extensionOptions, result);
            if (moduleResolutionUsesNodeModules(moduleResolution)) {
                let foundGlobal = false;
                if (fragmentDirectory === void 0) {
                    for (const moduleName of enumerateNodeModulesVisibleToScript(host, scriptPath)) {
                        const moduleResult = nameAndKind(moduleName, "external module name" /* externalModuleName */, 
                        /*extension*/
                        void 0);
                        if (!result.has(moduleResult.name)) {
                            foundGlobal = true;
                            result.add(moduleResult);
                        }
                    }
                }
                if (!foundGlobal) {
                    let ancestorLookup = (ancestor) => {
                        const nodeModules = combinePaths(ancestor, "node_modules");
                        if (tryDirectoryExists(host, nodeModules)) {
                            getCompletionEntriesForDirectoryFragment(fragment, nodeModules, extensionOptions, host, 
                            /*moduleSpecifierIsRelative*/
                            false, 
                            /*exclude*/
                            void 0, result);
                        }
                    };
                    if (fragmentDirectory && getResolvePackageJsonExports(compilerOptions)) {
                        const nodeModulesDirectoryLookup = ancestorLookup;
                        ancestorLookup = (ancestor) => {
                            const components = getPathComponents(fragment);
                            components.shift();
                            let packagePath = components.shift();
                            if (!packagePath) {
                                return nodeModulesDirectoryLookup(ancestor);
                            }
                            if (startsWith(packagePath, "@")) {
                                const subName = components.shift();
                                if (!subName) {
                                    return nodeModulesDirectoryLookup(ancestor);
                                }
                                packagePath = combinePaths(packagePath, subName);
                            }
                            const packageDirectory = combinePaths(ancestor, "node_modules", packagePath);
                            const packageFile = combinePaths(packageDirectory, "package.json");
                            if (tryFileExists(host, packageFile)) {
                                const packageJson = readJson(packageFile, host);
                                const exports = packageJson.exports;
                                if (exports) {
                                    if (typeof exports !== "object" || exports === null) {
                                        return;
                                    }
                                    const keys = getOwnKeys(exports);
                                    const fragmentSubpath = components.join("/") + (components.length && hasTrailingDirectorySeparator(fragment) ? "/" : "");
                                    const conditions = mode === 99 /* ESNext */ ? ["node", "import", "types"] : ["node", "require", "types"];
                                    addCompletionEntriesFromPathsOrExports(result, fragmentSubpath, packageDirectory, extensionOptions, host, keys, (key) => singleElementArray(getPatternFromFirstMatchingCondition(exports[key], conditions)), comparePatternKeys);
                                    return;
                                }
                            }
                            return nodeModulesDirectoryLookup(ancestor);
                        };
                    }
                    forEachAncestorDirectory(scriptPath, ancestorLookup);
                }
            }
            return arrayFrom(result.values());
        }