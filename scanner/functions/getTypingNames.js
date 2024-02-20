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