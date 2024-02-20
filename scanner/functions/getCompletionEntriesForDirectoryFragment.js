function getCompletionEntriesForDirectoryFragment(fragment, scriptDirectory, extensionOptions, host, moduleSpecifierIsRelative, exclude, result = createNameAndKindSet()) {
            var _a2;
            if (fragment === void 0) {
                fragment = "";
            }
            fragment = normalizeSlashes(fragment);
            if (!hasTrailingDirectorySeparator(fragment)) {
                fragment = getDirectoryPath(fragment);
            }
            if (fragment === "") {
                fragment = "." + directorySeparator;
            }
            fragment = ensureTrailingDirectorySeparator(fragment);
            const absolutePath = resolvePath(scriptDirectory, fragment);
            const baseDirectory = hasTrailingDirectorySeparator(absolutePath) ? absolutePath : getDirectoryPath(absolutePath);
            if (!moduleSpecifierIsRelative) {
                const packageJsonPath = findPackageJson(baseDirectory, host);
                if (packageJsonPath) {
                    const packageJson = readJson(packageJsonPath, host);
                    const typesVersions = packageJson.typesVersions;
                    if (typeof typesVersions === "object") {
                        const versionPaths = (_a2 = getPackageJsonTypesVersionsPaths(typesVersions)) == null ? void 0 : _a2.paths;
                        if (versionPaths) {
                            const packageDirectory = getDirectoryPath(packageJsonPath);
                            const pathInPackage = absolutePath.slice(ensureTrailingDirectorySeparator(packageDirectory).length);
                            if (addCompletionEntriesFromPaths(result, pathInPackage, packageDirectory, extensionOptions, host, versionPaths)) {
                                return result;
                            }
                        }
                    }
                }
            }
            const ignoreCase = !(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
            if (!tryDirectoryExists(host, baseDirectory))
                return result;
            const files = tryReadDirectory(host, baseDirectory, extensionOptions.extensionsToSearch, 
            /*exclude*/
            void 0, 
            /*include*/
            ["./*"]);
            if (files) {
                for (let filePath of files) {
                    filePath = normalizePath(filePath);
                    if (exclude && comparePaths(filePath, exclude, scriptDirectory, ignoreCase) === 0 /* EqualTo */) {
                        continue;
                    }
                    const { name, extension } = getFilenameWithExtensionOption(getBaseFileName(filePath), host.getCompilationSettings(), extensionOptions);
                    result.add(nameAndKind(name, "script" /* scriptElement */, extension));
                }
            }
            const directories = tryGetDirectories(host, baseDirectory);
            if (directories) {
                for (const directory of directories) {
                    const directoryName = getBaseFileName(normalizePath(directory));
                    if (directoryName !== "@types") {
                        result.add(directoryResult(directoryName));
                    }
                }
            }
            return result;
        }