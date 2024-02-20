function createBuilderProgramUsingProgramBuildInfo(buildInfo, buildInfoPath, host) {
            var _a2, _b, _c, _d;
            const program = buildInfo.program;
            const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
            const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
            let state;
            const filePaths = (_a2 = program.fileNames) == null ? void 0 : _a2.map(toPath3);
            let filePathsSetList;
            const latestChangedDtsFile = program.latestChangedDtsFile ? toAbsolutePath(program.latestChangedDtsFile) : void 0;
            if (isProgramBundleEmitBuildInfo(program)) {
                const fileInfos = /* @__PURE__ */ new Map();
                program.fileInfos.forEach((fileInfo, index) => {
                    const path = toFilePath(index + 1);
                    fileInfos.set(path, isString(fileInfo) ? { version: fileInfo, signature: void 0, affectsGlobalScope: void 0, impliedFormat: void 0 } : fileInfo);
                });
                state = {
                    fileInfos,
                    compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
                    latestChangedDtsFile,
                    outSignature: program.outSignature,
                    programEmitPending: program.pendingEmit === void 0 ? void 0 : toProgramEmitPending(program.pendingEmit, program.options),
                    bundle: buildInfo.bundle
                };
            }
            else {
                filePathsSetList = (_b = program.fileIdsList) == null ? void 0 : _b.map((fileIds) => new Set(fileIds.map(toFilePath)));
                const fileInfos = /* @__PURE__ */ new Map();
                const emitSignatures = ((_c = program.options) == null ? void 0 : _c.composite) && !outFile(program.options) ? /* @__PURE__ */ new Map() : void 0;
                program.fileInfos.forEach((fileInfo, index) => {
                    const path = toFilePath(index + 1);
                    const stateFileInfo = toBuilderStateFileInfoForMultiEmit(fileInfo);
                    fileInfos.set(path, stateFileInfo);
                    if (emitSignatures && stateFileInfo.signature)
                        emitSignatures.set(path, stateFileInfo.signature);
                });
                (_d = program.emitSignatures) == null ? void 0 : _d.forEach((value) => {
                    if (isNumber(value))
                        emitSignatures.delete(toFilePath(value));
                    else {
                        const key = toFilePath(value[0]);
                        emitSignatures.set(key, !isString(value[1]) && !value[1].length ? (
                        // File signature is emit signature but differs in map
                        [emitSignatures.get(key)]) : value[1]);
                    }
                });
                const fullEmitForOptions = program.affectedFilesPendingEmit ? getBuilderFileEmit(program.options || {}) : void 0;
                state = {
                    fileInfos,
                    compilerOptions: program.options ? convertToOptionsWithAbsolutePaths(program.options, toAbsolutePath) : {},
                    referencedMap: toManyToManyPathMap(program.referencedMap),
                    exportedModulesMap: toManyToManyPathMap(program.exportedModulesMap),
                    semanticDiagnosticsPerFile: program.semanticDiagnosticsPerFile && arrayToMap(program.semanticDiagnosticsPerFile, (value) => toFilePath(isNumber(value) ? value : value[0]), (value) => isNumber(value) ? emptyArray : value[1]),
                    hasReusableDiagnostic: true,
                    affectedFilesPendingEmit: program.affectedFilesPendingEmit && arrayToMap(program.affectedFilesPendingEmit, (value) => toFilePath(isNumber(value) ? value : value[0]), (value) => toBuilderFileEmit(value, fullEmitForOptions)),
                    changedFilesSet: new Set(map(program.changeFileSet, toFilePath)),
                    latestChangedDtsFile,
                    emitSignatures: (emitSignatures == null ? void 0 : emitSignatures.size) ? emitSignatures : void 0
                };
            }
            return {
                getState: () => state,
                saveEmitState: noop,
                restoreEmitState: noop,
                getProgram: notImplemented,
                getProgramOrUndefined: returnUndefined,
                releaseProgram: noop,
                getCompilerOptions: () => state.compilerOptions,
                getSourceFile: notImplemented,
                getSourceFiles: notImplemented,
                getOptionsDiagnostics: notImplemented,
                getGlobalDiagnostics: notImplemented,
                getConfigFileParsingDiagnostics: notImplemented,
                getSyntacticDiagnostics: notImplemented,
                getDeclarationDiagnostics: notImplemented,
                getSemanticDiagnostics: notImplemented,
                emit: notImplemented,
                getAllDependencies: notImplemented,
                getCurrentDirectory: notImplemented,
                emitNextAffectedFile: notImplemented,
                getSemanticDiagnosticsOfNextAffectedFile: notImplemented,
                emitBuildInfo: notImplemented,
                close: noop,
                hasChangedEmitSignature: returnFalse
            };
            function toPath3(path) {
                return toPath(path, buildInfoDirectory, getCanonicalFileName);
            }
            function toAbsolutePath(path) {
                return getNormalizedAbsolutePath(path, buildInfoDirectory);
            }
            function toFilePath(fileId) {
                return filePaths[fileId - 1];
            }
            function toFilePathsSet(fileIdsListId) {
                return filePathsSetList[fileIdsListId - 1];
            }
            function toManyToManyPathMap(referenceMap) {
                if (!referenceMap) {
                    return void 0;
                }
                const map2 = BuilderState.createManyToManyPathMap();
                referenceMap.forEach(([fileId, fileIdListId]) => map2.set(toFilePath(fileId), toFilePathsSet(fileIdListId)));
                return map2;
            }
        }