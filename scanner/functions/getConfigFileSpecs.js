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