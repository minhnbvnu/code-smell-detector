function parseJsonConfigFileContentWorker(json, sourceFile, host, basePath, existingOptions = {}, existingWatchOptions, configFileName, resolutionStack = [], extraFileExtensions = [], extendedConfigCache) {
            Debug.assert(json === void 0 && sourceFile !== void 0 || json !== void 0 && sourceFile === void 0);
            const errors = [];
            const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
            const { raw } = parsedConfig;
            const options = extend(existingOptions, parsedConfig.options || {});
            const watchOptions = existingWatchOptions && parsedConfig.watchOptions ? extend(existingWatchOptions, parsedConfig.watchOptions) : parsedConfig.watchOptions || existingWatchOptions;
            options.configFilePath = configFileName && normalizeSlashes(configFileName);
            const configFileSpecs = getConfigFileSpecs();
            if (sourceFile)
                sourceFile.configFileSpecs = configFileSpecs;
            setConfigFileInOptions(options, sourceFile);
            const basePathForFileNames = normalizePath(configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath);
            return {
                options,
                watchOptions,
                fileNames: getFileNames(basePathForFileNames),
                projectReferences: getProjectReferences(basePathForFileNames),
                typeAcquisition: parsedConfig.typeAcquisition || getDefaultTypeAcquisition(),
                raw,
                errors,
                // Wildcard directories (provided as part of a wildcard path) are stored in a
                // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
                // or a recursive directory. This information is used by filesystem watchers to monitor for
                // new entries in these paths.
                wildcardDirectories: getWildcardDirectories(configFileSpecs, basePathForFileNames, host.useCaseSensitiveFileNames),
                compileOnSave: !!raw.compileOnSave
            };
            function getConfigFileSpecs() {
                const referencesOfRaw = getPropFromRaw("references", (element) => typeof element === "object", "object");
                const filesSpecs = toPropValue(getSpecsFromRaw("files"));
                if (filesSpecs) {
                    const hasZeroOrNoReferences = referencesOfRaw === "no-prop" || isArray(referencesOfRaw) && referencesOfRaw.length === 0;
                    const hasExtends = hasProperty(raw, "extends");
                    if (filesSpecs.length === 0 && hasZeroOrNoReferences && !hasExtends) {
                        if (sourceFile) {
                            const fileName = configFileName || "tsconfig.json";
                            const diagnosticMessage = Diagnostics.The_files_list_in_config_file_0_is_empty;
                            const nodeValue = firstDefined(getTsConfigPropArray(sourceFile, "files"), (property) => property.initializer);
                            const error = nodeValue ? createDiagnosticForNodeInSourceFile(sourceFile, nodeValue, diagnosticMessage, fileName) : createCompilerDiagnostic(diagnosticMessage, fileName);
                            errors.push(error);
                        }
                        else {
                            createCompilerDiagnosticOnlyIfJson(Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json");
                        }
                    }
                }
                let includeSpecs = toPropValue(getSpecsFromRaw("include"));
                const excludeOfRaw = getSpecsFromRaw("exclude");
                let isDefaultIncludeSpec = false;
                let excludeSpecs = toPropValue(excludeOfRaw);
                if (excludeOfRaw === "no-prop" && raw.compilerOptions) {
                    const outDir = raw.compilerOptions.outDir;
                    const declarationDir = raw.compilerOptions.declarationDir;
                    if (outDir || declarationDir) {
                        excludeSpecs = [outDir, declarationDir].filter((d) => !!d);
                    }
                }
                if (filesSpecs === void 0 && includeSpecs === void 0) {
                    includeSpecs = [defaultIncludeSpec];
                    isDefaultIncludeSpec = true;
                }
                let validatedIncludeSpecs, validatedExcludeSpecs;
                if (includeSpecs) {
                    validatedIncludeSpecs = validateSpecs(includeSpecs, errors, 
                    /*disallowTrailingRecursion*/
                    true, sourceFile, "include");
                }
                if (excludeSpecs) {
                    validatedExcludeSpecs = validateSpecs(excludeSpecs, errors, 
                    /*disallowTrailingRecursion*/
                    false, sourceFile, "exclude");
                }
                return {
                    filesSpecs,
                    includeSpecs,
                    excludeSpecs,
                    validatedFilesSpec: filter(filesSpecs, isString),
                    validatedIncludeSpecs,
                    validatedExcludeSpecs,
                    pathPatterns: void 0,
                    // Initialized on first use
                    isDefaultIncludeSpec
                };
            }
            function getFileNames(basePath2) {
                const fileNames = getFileNamesFromConfigSpecs(configFileSpecs, basePath2, options, host, extraFileExtensions);
                if (shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(raw), resolutionStack)) {
                    errors.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
                }
                return fileNames;
            }
            function getProjectReferences(basePath2) {
                let projectReferences;
                const referencesOfRaw = getPropFromRaw("references", (element) => typeof element === "object", "object");
                if (isArray(referencesOfRaw)) {
                    for (const ref of referencesOfRaw) {
                        if (typeof ref.path !== "string") {
                            createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string");
                        }
                        else {
                            (projectReferences || (projectReferences = [])).push({
                                path: getNormalizedAbsolutePath(ref.path, basePath2),
                                originalPath: ref.path,
                                prepend: ref.prepend,
                                circular: ref.circular
                            });
                        }
                    }
                }
                return projectReferences;
            }
            function toPropValue(specResult) {
                return isArray(specResult) ? specResult : void 0;
            }
            function getSpecsFromRaw(prop) {
                return getPropFromRaw(prop, isString, "string");
            }
            function getPropFromRaw(prop, validateElement, elementTypeName) {
                if (hasProperty(raw, prop) && !isNullOrUndefined(raw[prop])) {
                    if (isArray(raw[prop])) {
                        const result = raw[prop];
                        if (!sourceFile && !every(result, validateElement)) {
                            errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, elementTypeName));
                        }
                        return result;
                    }
                    else {
                        createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, "Array");
                        return "not-array";
                    }
                }
                return "no-prop";
            }
            function createCompilerDiagnosticOnlyIfJson(message, arg0, arg1) {
                if (!sourceFile) {
                    errors.push(createCompilerDiagnostic(message, arg0, arg1));
                }
            }
        }