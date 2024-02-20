function discoverTypings(host, log, fileNames, projectRootPath, safeList, packageNameToTypingLocation, typeAcquisition, unresolvedImports, typesRegistry, compilerOptions) {
            if (!typeAcquisition || !typeAcquisition.enable) {
                return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
            }
            const inferredTypings = /* @__PURE__ */ new Map();
            fileNames = mapDefined(fileNames, (fileName) => {
                const path = normalizePath(fileName);
                if (hasJSFileExtension(path)) {
                    return path;
                }
            });
            const filesToWatch = [];
            if (typeAcquisition.include)
                addInferredTypings(typeAcquisition.include, "Explicitly included types");
            const exclude = typeAcquisition.exclude || [];
            if (!compilerOptions.types) {
                const possibleSearchDirs = new Set(fileNames.map(getDirectoryPath));
                possibleSearchDirs.add(projectRootPath);
                possibleSearchDirs.forEach((searchDir) => {
                    getTypingNames(searchDir, "bower.json", "bower_components", filesToWatch);
                    getTypingNames(searchDir, "package.json", "node_modules", filesToWatch);
                });
            }
            if (!typeAcquisition.disableFilenameBasedTypeAcquisition) {
                getTypingNamesFromSourceFileNames(fileNames);
            }
            if (unresolvedImports) {
                const module2 = deduplicate(unresolvedImports.map(nonRelativeModuleNameForTypingCache), equateStringsCaseSensitive, compareStringsCaseSensitive);
                addInferredTypings(module2, "Inferred typings from unresolved imports");
            }
            packageNameToTypingLocation.forEach((typing, name) => {
                const registryEntry = typesRegistry.get(name);
                if (inferredTypings.has(name) && inferredTypings.get(name) === void 0 && registryEntry !== void 0 && isTypingUpToDate(typing, registryEntry)) {
                    inferredTypings.set(name, typing.typingLocation);
                }
            });
            for (const excludeTypingName of exclude) {
                const didDelete = inferredTypings.delete(excludeTypingName);
                if (didDelete && log)
                    log(`Typing for ${excludeTypingName} is in exclude list, will be ignored.`);
            }
            const newTypingNames = [];
            const cachedTypingPaths = [];
            inferredTypings.forEach((inferred, typing) => {
                if (inferred !== void 0) {
                    cachedTypingPaths.push(inferred);
                }
                else {
                    newTypingNames.push(typing);
                }
            });
            const result = { cachedTypingPaths, newTypingNames, filesToWatch };
            if (log)
                log(`Result: ${JSON.stringify(result)}`);
            return result;
            function addInferredTyping(typingName) {
                if (!inferredTypings.has(typingName)) {
                    inferredTypings.set(typingName, void 0);
                }
            }
            function addInferredTypings(typingNames, message) {
                if (log)
                    log(`${message}: ${JSON.stringify(typingNames)}`);
                forEach(typingNames, addInferredTyping);
            }
            function getTypingNames(projectRootPath2, manifestName, modulesDirName, filesToWatch2) {
                const manifestPath = combinePaths(projectRootPath2, manifestName);
                let manifest;
                let manifestTypingNames;
                if (host.fileExists(manifestPath)) {
                    filesToWatch2.push(manifestPath);
                    manifest = readConfigFile(manifestPath, (path) => host.readFile(path)).config;
                    manifestTypingNames = flatMap([manifest.dependencies, manifest.devDependencies, manifest.optionalDependencies, manifest.peerDependencies], getOwnKeys);
                    addInferredTypings(manifestTypingNames, `Typing names in '${manifestPath}' dependencies`);
                }
                const packagesFolderPath = combinePaths(projectRootPath2, modulesDirName);
                filesToWatch2.push(packagesFolderPath);
                if (!host.directoryExists(packagesFolderPath)) {
                    return;
                }
                const packageNames = [];
                const dependencyManifestNames = manifestTypingNames ? manifestTypingNames.map((typingName) => combinePaths(packagesFolderPath, typingName, manifestName)) : host.readDirectory(packagesFolderPath, [".json" /* Json */], 
                /*excludes*/
                void 0, 
                /*includes*/
                void 0, 
                /*depth*/
                3).filter((manifestPath2) => {
                    if (getBaseFileName(manifestPath2) !== manifestName) {
                        return false;
                    }
                    const pathComponents2 = getPathComponents(normalizePath(manifestPath2));
                    const isScoped = pathComponents2[pathComponents2.length - 3][0] === "@";
                    return isScoped && toFileNameLowerCase(pathComponents2[pathComponents2.length - 4]) === modulesDirName || // `node_modules/@foo/bar`
                        !isScoped && toFileNameLowerCase(pathComponents2[pathComponents2.length - 3]) === modulesDirName;
                });
                if (log)
                    log(`Searching for typing names in ${packagesFolderPath}; all files: ${JSON.stringify(dependencyManifestNames)}`);
                for (const manifestPath2 of dependencyManifestNames) {
                    const normalizedFileName = normalizePath(manifestPath2);
                    const result2 = readConfigFile(normalizedFileName, (path) => host.readFile(path));
                    const manifest2 = result2.config;
                    if (!manifest2.name) {
                        continue;
                    }
                    const ownTypes = manifest2.types || manifest2.typings;
                    if (ownTypes) {
                        const absolutePath = getNormalizedAbsolutePath(ownTypes, getDirectoryPath(normalizedFileName));
                        if (host.fileExists(absolutePath)) {
                            if (log)
                                log(`    Package '${manifest2.name}' provides its own types.`);
                            inferredTypings.set(manifest2.name, absolutePath);
                        }
                        else {
                            if (log)
                                log(`    Package '${manifest2.name}' provides its own types but they are missing.`);
                        }
                    }
                    else {
                        packageNames.push(manifest2.name);
                    }
                }
                addInferredTypings(packageNames, "    Found package names");
            }
            function getTypingNamesFromSourceFileNames(fileNames2) {
                const fromFileNames = mapDefined(fileNames2, (j) => {
                    if (!hasJSFileExtension(j))
                        return void 0;
                    const inferredTypingName = removeFileExtension(toFileNameLowerCase(getBaseFileName(j)));
                    const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
                    return safeList.get(cleanedTypingName);
                });
                if (fromFileNames.length) {
                    addInferredTypings(fromFileNames, "Inferred typings from file names");
                }
                const hasJsxFile = some(fileNames2, (f) => fileExtensionIs(f, ".jsx" /* Jsx */));
                if (hasJsxFile) {
                    if (log)
                        log(`Inferred 'react' typings due to presence of '.jsx' extension`);
                    addInferredTyping("react");
                }
            }
        }