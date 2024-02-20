function synchronizeProgram() {
                writeLog(`Synchronizing program`);
                Debug.assert(compilerOptions);
                Debug.assert(rootFileNames);
                clearInvalidateResolutionsOfFailedLookupLocations();
                const program = getCurrentBuilderProgram();
                if (hasChangedCompilerOptions) {
                    newLine = updateNewLine();
                    if (program && changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                        resolutionCache.clear();
                    }
                }
                const hasInvalidatedResolutions = resolutionCache.createHasInvalidatedResolutions(customHasInvalidatedResolutions);
                const { originalReadFile, originalFileExists, originalDirectoryExists, originalCreateDirectory, originalWriteFile, readFileWithCache } = changeCompilerHostLikeToUseCache(compilerHost, toPath3);
                if (isProgramUptoDate(getCurrentProgram(), rootFileNames, compilerOptions, (path) => getSourceVersion(path, readFileWithCache), (fileName) => compilerHost.fileExists(fileName), hasInvalidatedResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
                    if (hasChangedConfigFileParsingErrors) {
                        if (reportFileChangeDetectedOnCreateProgram) {
                            reportWatchDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation);
                        }
                        builderProgram = createProgram2(
                        /*rootNames*/
                        void 0, 
                        /*options*/
                        void 0, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
                        hasChangedConfigFileParsingErrors = false;
                    }
                }
                else {
                    if (reportFileChangeDetectedOnCreateProgram) {
                        reportWatchDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation);
                    }
                    createNewProgram(hasInvalidatedResolutions);
                }
                reportFileChangeDetectedOnCreateProgram = false;
                if (host.afterProgramCreate && program !== builderProgram) {
                    host.afterProgramCreate(builderProgram);
                }
                compilerHost.readFile = originalReadFile;
                compilerHost.fileExists = originalFileExists;
                compilerHost.directoryExists = originalDirectoryExists;
                compilerHost.createDirectory = originalCreateDirectory;
                compilerHost.writeFile = originalWriteFile;
                return builderProgram;
            }