function getFileNamesFromConfigSpecs(configFileSpecs, basePath, options, host, extraFileExtensions = emptyArray) {
            basePath = normalizePath(basePath);
            const keyMapper = createGetCanonicalFileName(host.useCaseSensitiveFileNames);
            const literalFileMap = /* @__PURE__ */ new Map();
            const wildcardFileMap = /* @__PURE__ */ new Map();
            const wildCardJsonFileMap = /* @__PURE__ */ new Map();
            const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = configFileSpecs;
            const supportedExtensions = getSupportedExtensions(options, extraFileExtensions);
            const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);
            if (validatedFilesSpec) {
                for (const fileName of validatedFilesSpec) {
                    const file = getNormalizedAbsolutePath(fileName, basePath);
                    literalFileMap.set(keyMapper(file), file);
                }
            }
            let jsonOnlyIncludeRegexes;
            if (validatedIncludeSpecs && validatedIncludeSpecs.length > 0) {
                for (const file of host.readDirectory(basePath, flatten(supportedExtensionsWithJsonIfResolveJsonModule), validatedExcludeSpecs, validatedIncludeSpecs, 
                /*depth*/
                void 0)) {
                    if (fileExtensionIs(file, ".json" /* Json */)) {
                        if (!jsonOnlyIncludeRegexes) {
                            const includes = validatedIncludeSpecs.filter((s) => endsWith(s, ".json" /* Json */));
                            const includeFilePatterns = map(getRegularExpressionsForWildcards(includes, basePath, "files"), (pattern) => `^${pattern}$`);
                            jsonOnlyIncludeRegexes = includeFilePatterns ? includeFilePatterns.map((pattern) => getRegexFromPattern(pattern, host.useCaseSensitiveFileNames)) : emptyArray;
                        }
                        const includeIndex = findIndex(jsonOnlyIncludeRegexes, (re) => re.test(file));
                        if (includeIndex !== -1) {
                            const key2 = keyMapper(file);
                            if (!literalFileMap.has(key2) && !wildCardJsonFileMap.has(key2)) {
                                wildCardJsonFileMap.set(key2, file);
                            }
                        }
                        continue;
                    }
                    if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
                        continue;
                    }
                    removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);
                    const key = keyMapper(file);
                    if (!literalFileMap.has(key) && !wildcardFileMap.has(key)) {
                        wildcardFileMap.set(key, file);
                    }
                }
            }
            const literalFiles = arrayFrom(literalFileMap.values());
            const wildcardFiles = arrayFrom(wildcardFileMap.values());
            return literalFiles.concat(wildcardFiles, arrayFrom(wildCardJsonFileMap.values()));
        }