function createNewProgram(hasInvalidatedResolutions) {
                writeLog("CreatingProgramWith::");
                writeLog(`  roots: ${JSON.stringify(rootFileNames)}`);
                writeLog(`  options: ${JSON.stringify(compilerOptions)}`);
                if (projectReferences)
                    writeLog(`  projectReferences: ${JSON.stringify(projectReferences)}`);
                const needsUpdateInTypeRootWatch = hasChangedCompilerOptions || !getCurrentProgram();
                hasChangedCompilerOptions = false;
                hasChangedConfigFileParsingErrors = false;
                resolutionCache.startCachingPerDirectoryResolution();
                compilerHost.hasInvalidatedResolutions = hasInvalidatedResolutions;
                compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
                const oldProgram = getCurrentProgram();
                builderProgram = createProgram2(rootFileNames, compilerOptions, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
                resolutionCache.finishCachingPerDirectoryResolution(builderProgram.getProgram(), oldProgram);
                updateMissingFilePathsWatch(builderProgram.getProgram(), missingFilesMap || (missingFilesMap = /* @__PURE__ */ new Map()), watchMissingFilePath);
                if (needsUpdateInTypeRootWatch) {
                    resolutionCache.updateTypeRootsWatch();
                }
                if (missingFilePathsRequestedForRelease) {
                    for (const missingFilePath of missingFilePathsRequestedForRelease) {
                        if (!missingFilesMap.has(missingFilePath)) {
                            sourceFilesCache.delete(missingFilePath);
                        }
                    }
                    missingFilePathsRequestedForRelease = void 0;
                }
            }