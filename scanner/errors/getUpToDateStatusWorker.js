function getUpToDateStatusWorker(state, project, resolvedPath) {
            var _a2, _b;
            if (!project.fileNames.length && !canJsonReportNoInputFiles(project.raw)) {
                return {
                    type: 16 /* ContainerOnly */
                };
            }
            let referenceStatuses;
            const force = !!state.options.force;
            if (project.projectReferences) {
                state.projectStatus.set(resolvedPath, { type: 13 /* ComputingUpstream */ });
                for (const ref of project.projectReferences) {
                    const resolvedRef = resolveProjectReferencePath(ref);
                    const resolvedRefPath = toResolvedConfigFilePath(state, resolvedRef);
                    const resolvedConfig = parseConfigFile(state, resolvedRef, resolvedRefPath);
                    const refStatus = getUpToDateStatus(state, resolvedConfig, resolvedRefPath);
                    if (refStatus.type === 13 /* ComputingUpstream */ || refStatus.type === 16 /* ContainerOnly */) {
                        continue;
                    }
                    if (refStatus.type === 0 /* Unbuildable */ || refStatus.type === 12 /* UpstreamBlocked */) {
                        return {
                            type: 12 /* UpstreamBlocked */,
                            upstreamProjectName: ref.path,
                            upstreamProjectBlocked: refStatus.type === 12 /* UpstreamBlocked */
                        };
                    }
                    if (refStatus.type !== 1 /* UpToDate */) {
                        return {
                            type: 11 /* UpstreamOutOfDate */,
                            upstreamProjectName: ref.path
                        };
                    }
                    if (!force)
                        (referenceStatuses || (referenceStatuses = [])).push({ ref, refStatus, resolvedRefPath, resolvedConfig });
                }
            }
            if (force)
                return { type: 17 /* ForceBuild */ };
            const { host } = state;
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(project.options);
            let oldestOutputFileName;
            let oldestOutputFileTime = maximumDate;
            let buildInfoTime;
            let buildInfoProgram;
            let buildInfoVersionMap;
            if (buildInfoPath) {
                const buildInfoCacheEntry2 = getBuildInfoCacheEntry(state, buildInfoPath, resolvedPath);
                buildInfoTime = (buildInfoCacheEntry2 == null ? void 0 : buildInfoCacheEntry2.modifiedTime) || getModifiedTime(host, buildInfoPath);
                if (buildInfoTime === missingFileModifiedTime) {
                    if (!buildInfoCacheEntry2) {
                        state.buildInfoCache.set(resolvedPath, {
                            path: toPath2(state, buildInfoPath),
                            buildInfo: false,
                            modifiedTime: buildInfoTime
                        });
                    }
                    return {
                        type: 4 /* OutputMissing */,
                        missingOutputFileName: buildInfoPath
                    };
                }
                const buildInfo = getBuildInfo3(state, buildInfoPath, resolvedPath, buildInfoTime);
                if (!buildInfo) {
                    return {
                        type: 5 /* ErrorReadingFile */,
                        fileName: buildInfoPath
                    };
                }
                if ((buildInfo.bundle || buildInfo.program) && buildInfo.version !== version) {
                    return {
                        type: 14 /* TsVersionOutputOfDate */,
                        version: buildInfo.version
                    };
                }
                if (buildInfo.program) {
                    if (((_a2 = buildInfo.program.changeFileSet) == null ? void 0 : _a2.length) || (!project.options.noEmit ? (_b = buildInfo.program.affectedFilesPendingEmit) == null ? void 0 : _b.length : some(buildInfo.program.semanticDiagnosticsPerFile, isArray))) {
                        return {
                            type: 8 /* OutOfDateBuildInfo */,
                            buildInfoFile: buildInfoPath
                        };
                    }
                    if (!project.options.noEmit && getPendingEmitKind(project.options, buildInfo.program.options || {})) {
                        return {
                            type: 9 /* OutOfDateOptions */,
                            buildInfoFile: buildInfoPath
                        };
                    }
                    buildInfoProgram = buildInfo.program;
                }
                oldestOutputFileTime = buildInfoTime;
                oldestOutputFileName = buildInfoPath;
            }
            let newestInputFileName = void 0;
            let newestInputFileTime = minimumDate;
            let pseudoInputUpToDate = false;
            const seenRoots = /* @__PURE__ */ new Set();
            for (const inputFile of project.fileNames) {
                const inputTime = getModifiedTime2(state, inputFile);
                if (inputTime === missingFileModifiedTime) {
                    return {
                        type: 0 /* Unbuildable */,
                        reason: `${inputFile} does not exist`
                    };
                }
                if (buildInfoTime && buildInfoTime < inputTime) {
                    let version2;
                    let currentVersion;
                    if (buildInfoProgram) {
                        if (!buildInfoVersionMap)
                            buildInfoVersionMap = getBuildInfoFileVersionMap(buildInfoProgram, buildInfoPath, host);
                        version2 = buildInfoVersionMap.fileInfos.get(toPath2(state, inputFile));
                        const text = version2 ? state.readFileWithCache(inputFile) : void 0;
                        currentVersion = text !== void 0 ? getSourceFileVersionAsHashFromText(host, text) : void 0;
                        if (version2 && version2 === currentVersion)
                            pseudoInputUpToDate = true;
                    }
                    if (!version2 || version2 !== currentVersion) {
                        return {
                            type: 6 /* OutOfDateWithSelf */,
                            outOfDateOutputFileName: buildInfoPath,
                            newerInputFileName: inputFile
                        };
                    }
                }
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
                if (buildInfoProgram)
                    seenRoots.add(toPath2(state, inputFile));
            }
            if (buildInfoProgram) {
                if (!buildInfoVersionMap)
                    buildInfoVersionMap = getBuildInfoFileVersionMap(buildInfoProgram, buildInfoPath, host);
                for (const existingRoot of buildInfoVersionMap.roots) {
                    if (!seenRoots.has(existingRoot)) {
                        return {
                            type: 10 /* OutOfDateRoots */,
                            buildInfoFile: buildInfoPath,
                            inputFile: existingRoot
                        };
                    }
                }
            }
            if (!buildInfoPath) {
                const outputs = getAllProjectOutputs(project, !host.useCaseSensitiveFileNames());
                const outputTimeStampMap = getOutputTimeStampMap(state, resolvedPath);
                for (const output of outputs) {
                    const path = toPath2(state, output);
                    let outputTime = outputTimeStampMap == null ? void 0 : outputTimeStampMap.get(path);
                    if (!outputTime) {
                        outputTime = getModifiedTime(state.host, output);
                        outputTimeStampMap == null ? void 0 : outputTimeStampMap.set(path, outputTime);
                    }
                    if (outputTime === missingFileModifiedTime) {
                        return {
                            type: 4 /* OutputMissing */,
                            missingOutputFileName: output
                        };
                    }
                    if (outputTime < newestInputFileTime) {
                        return {
                            type: 6 /* OutOfDateWithSelf */,
                            outOfDateOutputFileName: output,
                            newerInputFileName: newestInputFileName
                        };
                    }
                    if (outputTime < oldestOutputFileTime) {
                        oldestOutputFileTime = outputTime;
                        oldestOutputFileName = output;
                    }
                }
            }
            const buildInfoCacheEntry = state.buildInfoCache.get(resolvedPath);
            let pseudoUpToDate = false;
            let usesPrepend = false;
            let upstreamChangedProject;
            if (referenceStatuses) {
                for (const { ref, refStatus, resolvedConfig, resolvedRefPath } of referenceStatuses) {
                    usesPrepend = usesPrepend || !!ref.prepend;
                    if (refStatus.newestInputFileTime && refStatus.newestInputFileTime <= oldestOutputFileTime) {
                        continue;
                    }
                    if (buildInfoCacheEntry && hasSameBuildInfo(state, buildInfoCacheEntry, resolvedRefPath)) {
                        return {
                            type: 7 /* OutOfDateWithUpstream */,
                            outOfDateOutputFileName: buildInfoPath,
                            newerProjectName: ref.path
                        };
                    }
                    const newestDeclarationFileContentChangedTime = getLatestChangedDtsTime(state, resolvedConfig.options, resolvedRefPath);
                    if (newestDeclarationFileContentChangedTime && newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                        pseudoUpToDate = true;
                        upstreamChangedProject = ref.path;
                        continue;
                    }
                    Debug.assert(oldestOutputFileName !== void 0, "Should have an oldest output filename here");
                    return {
                        type: 7 /* OutOfDateWithUpstream */,
                        outOfDateOutputFileName: oldestOutputFileName,
                        newerProjectName: ref.path
                    };
                }
            }
            const configStatus = checkConfigFileUpToDateStatus(state, project.options.configFilePath, oldestOutputFileTime, oldestOutputFileName);
            if (configStatus)
                return configStatus;
            const extendedConfigStatus = forEach(project.options.configFile.extendedSourceFiles || emptyArray, (configFile) => checkConfigFileUpToDateStatus(state, configFile, oldestOutputFileTime, oldestOutputFileName));
            if (extendedConfigStatus)
                return extendedConfigStatus;
            const dependentPackageFileStatus = forEach(state.lastCachedPackageJsonLookups.get(resolvedPath) || emptyArray, ([path]) => checkConfigFileUpToDateStatus(state, path, oldestOutputFileTime, oldestOutputFileName));
            if (dependentPackageFileStatus)
                return dependentPackageFileStatus;
            if (usesPrepend && pseudoUpToDate) {
                return {
                    type: 3 /* OutOfDateWithPrepend */,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerProjectName: upstreamChangedProject
                };
            }
            return {
                type: pseudoUpToDate ? 2 /* UpToDateWithUpstreamTypes */ : pseudoInputUpToDate ? 15 /* UpToDateWithInputFileText */ : 1 /* UpToDate */,
                newestInputFileTime,
                newestInputFileName,
                oldestOutputFileName
            };
        }