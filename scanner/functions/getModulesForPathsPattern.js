function getModulesForPathsPattern(fragment, packageDirectory, pattern, extensionOptions, host) {
            if (!host.readDirectory) {
                return void 0;
            }
            const parsed = tryParsePattern(pattern);
            if (parsed === void 0 || isString(parsed)) {
                return void 0;
            }
            const normalizedPrefix = resolvePath(parsed.prefix);
            const normalizedPrefixDirectory = hasTrailingDirectorySeparator(parsed.prefix) ? normalizedPrefix : getDirectoryPath(normalizedPrefix);
            const normalizedPrefixBase = hasTrailingDirectorySeparator(parsed.prefix) ? "" : getBaseFileName(normalizedPrefix);
            const fragmentHasPath = containsSlash(fragment);
            const fragmentDirectory = fragmentHasPath ? hasTrailingDirectorySeparator(fragment) ? fragment : getDirectoryPath(fragment) : void 0;
            const expandedPrefixDirectory = fragmentHasPath ? combinePaths(normalizedPrefixDirectory, normalizedPrefixBase + fragmentDirectory) : normalizedPrefixDirectory;
            const normalizedSuffix = normalizePath(parsed.suffix);
            const baseDirectory = normalizePath(combinePaths(packageDirectory, expandedPrefixDirectory));
            const completePrefix = fragmentHasPath ? baseDirectory : ensureTrailingDirectorySeparator(baseDirectory) + normalizedPrefixBase;
            const includeGlob = normalizedSuffix ? "**/*" + normalizedSuffix : "./*";
            const matches = mapDefined(tryReadDirectory(host, baseDirectory, extensionOptions.extensionsToSearch, 
            /*exclude*/
            void 0, [includeGlob]), (match) => {
                const trimmedWithPattern = trimPrefixAndSuffix(match);
                if (trimmedWithPattern) {
                    if (containsSlash(trimmedWithPattern)) {
                        return directoryResult(getPathComponents(removeLeadingDirectorySeparator(trimmedWithPattern))[1]);
                    }
                    const { name, extension } = getFilenameWithExtensionOption(trimmedWithPattern, host.getCompilationSettings(), extensionOptions);
                    return nameAndKind(name, "script" /* scriptElement */, extension);
                }
            });
            const directories = normalizedSuffix ? emptyArray : mapDefined(tryGetDirectories(host, baseDirectory), (dir) => dir === "node_modules" ? void 0 : directoryResult(dir));
            return [...matches, ...directories];
            function trimPrefixAndSuffix(path) {
                const inner = withoutStartAndEnd(normalizePath(path), completePrefix, normalizedSuffix);
                return inner === void 0 ? void 0 : removeLeadingDirectorySeparator(inner);
            }
        }