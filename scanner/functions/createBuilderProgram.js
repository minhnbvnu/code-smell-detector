function createBuilderProgram(kind, { newProgram, host, oldProgram, configFileParsingDiagnostics }) {
            let oldState = oldProgram && oldProgram.getState();
            if (oldState && newProgram === oldState.program && configFileParsingDiagnostics === newProgram.getConfigFileParsingDiagnostics()) {
                newProgram = void 0;
                oldState = void 0;
                return oldProgram;
            }
            const state = createBuilderProgramState(newProgram, oldState);
            newProgram.getBuildInfo = (bundle) => getBuildInfo2(state, bundle);
            newProgram = void 0;
            oldProgram = void 0;
            oldState = void 0;
            const getState = () => state;
            const builderProgram = createRedirectedBuilderProgram(getState, configFileParsingDiagnostics);
            builderProgram.getState = getState;
            builderProgram.saveEmitState = () => backupBuilderProgramEmitState(state);
            builderProgram.restoreEmitState = (saved) => restoreBuilderProgramEmitState(state, saved);
            builderProgram.hasChangedEmitSignature = () => !!state.hasChangedEmitSignature;
            builderProgram.getAllDependencies = (sourceFile) => BuilderState.getAllDependencies(state, Debug.checkDefined(state.program), sourceFile);
            builderProgram.getSemanticDiagnostics = getSemanticDiagnostics;
            builderProgram.emit = emit;
            builderProgram.releaseProgram = () => releaseCache(state);
            if (kind === 0 /* SemanticDiagnosticsBuilderProgram */) {
                builderProgram.getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
            }
            else if (kind === 1 /* EmitAndSemanticDiagnosticsBuilderProgram */) {
                builderProgram.getSemanticDiagnosticsOfNextAffectedFile = getSemanticDiagnosticsOfNextAffectedFile;
                builderProgram.emitNextAffectedFile = emitNextAffectedFile;
                builderProgram.emitBuildInfo = emitBuildInfo;
            }
            else {
                notImplemented();
            }
            return builderProgram;
            function emitBuildInfo(writeFile2, cancellationToken) {
                if (state.buildInfoEmitPending) {
                    const result = Debug.checkDefined(state.program).emitBuildInfo(writeFile2 || maybeBind(host, host.writeFile), cancellationToken);
                    state.buildInfoEmitPending = false;
                    return result;
                }
                return emitSkippedWithNoDiagnostics;
            }
            function emitNextAffectedFile(writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers) {
                var _a2, _b, _c, _d, _e;
                let affected = getNextAffectedFile(state, cancellationToken, host);
                const programEmitKind = getBuilderFileEmit(state.compilerOptions);
                let emitKind = emitOnlyDtsFiles ? programEmitKind & 24 /* AllDts */ : programEmitKind;
                if (!affected) {
                    if (!outFile(state.compilerOptions)) {
                        const pendingAffectedFile = getNextAffectedFilePendingEmit(state, emitOnlyDtsFiles);
                        if (!pendingAffectedFile) {
                            if (!state.buildInfoEmitPending)
                                return void 0;
                            const affected2 = state.program;
                            const result2 = affected2.emitBuildInfo(writeFile2 || maybeBind(host, host.writeFile), cancellationToken);
                            state.buildInfoEmitPending = false;
                            return { result: result2, affected: affected2 };
                        }
                        ({ affectedFile: affected, emitKind } = pendingAffectedFile);
                    }
                    else {
                        if (!state.programEmitPending)
                            return void 0;
                        emitKind = state.programEmitPending;
                        if (emitOnlyDtsFiles)
                            emitKind = emitKind & 24 /* AllDts */;
                        if (!emitKind)
                            return void 0;
                        affected = state.program;
                    }
                }
                let emitOnly;
                if (emitKind & 7 /* AllJs */)
                    emitOnly = 0 /* Js */;
                if (emitKind & 24 /* AllDts */)
                    emitOnly = emitOnly === void 0 ? 1 /* Dts */ : void 0;
                if (affected === state.program) {
                    state.programEmitPending = state.changedFilesSet.size ? getPendingEmitKind(programEmitKind, emitKind) : state.programEmitPending ? getPendingEmitKind(state.programEmitPending, emitKind) : void 0;
                }
                const result = state.program.emit(affected === state.program ? void 0 : affected, getWriteFileCallback(writeFile2, customTransformers), cancellationToken, emitOnly, customTransformers);
                if (affected !== state.program) {
                    const affectedSourceFile = affected;
                    state.seenAffectedFiles.add(affectedSourceFile.resolvedPath);
                    if (state.affectedFilesIndex !== void 0)
                        state.affectedFilesIndex++;
                    state.buildInfoEmitPending = true;
                    const existing = ((_a2 = state.seenEmittedFiles) == null ? void 0 : _a2.get(affectedSourceFile.resolvedPath)) || 0 /* None */;
                    ((_b = state.seenEmittedFiles) != null ? _b : state.seenEmittedFiles = /* @__PURE__ */ new Map()).set(affectedSourceFile.resolvedPath, emitKind | existing);
                    const existingPending = ((_c = state.affectedFilesPendingEmit) == null ? void 0 : _c.get(affectedSourceFile.resolvedPath)) || programEmitKind;
                    const pendingKind = getPendingEmitKind(existingPending, emitKind | existing);
                    if (pendingKind)
                        ((_d = state.affectedFilesPendingEmit) != null ? _d : state.affectedFilesPendingEmit = /* @__PURE__ */ new Map()).set(affectedSourceFile.resolvedPath, pendingKind);
                    else
                        (_e = state.affectedFilesPendingEmit) == null ? void 0 : _e.delete(affectedSourceFile.resolvedPath);
                }
                else {
                    state.changedFilesSet.clear();
                }
                return { result, affected };
            }
            function getWriteFileCallback(writeFile2, customTransformers) {
                if (!getEmitDeclarations(state.compilerOptions))
                    return writeFile2 || maybeBind(host, host.writeFile);
                return (fileName, text, writeByteOrderMark, onError, sourceFiles, data) => {
                    var _a2, _b, _c, _d, _e, _f, _g;
                    if (isDeclarationFileName(fileName)) {
                        if (!outFile(state.compilerOptions)) {
                            Debug.assert((sourceFiles == null ? void 0 : sourceFiles.length) === 1);
                            let emitSignature;
                            if (!customTransformers) {
                                const file = sourceFiles[0];
                                const info = state.fileInfos.get(file.resolvedPath);
                                if (info.signature === file.version) {
                                    const signature = computeSignatureWithDiagnostics(state.program, file, text, host, data);
                                    if (!((_a2 = data == null ? void 0 : data.diagnostics) == null ? void 0 : _a2.length))
                                        emitSignature = signature;
                                    if (signature !== file.version) {
                                        if (host.storeFilesChangingSignatureDuringEmit)
                                            ((_b = state.filesChangingSignature) != null ? _b : state.filesChangingSignature = /* @__PURE__ */ new Set()).add(file.resolvedPath);
                                        if (state.exportedModulesMap)
                                            BuilderState.updateExportedModules(state, file, file.exportedModulesFromDeclarationEmit);
                                        if (state.affectedFiles) {
                                            const existing = (_c = state.oldSignatures) == null ? void 0 : _c.get(file.resolvedPath);
                                            if (existing === void 0)
                                                ((_d = state.oldSignatures) != null ? _d : state.oldSignatures = /* @__PURE__ */ new Map()).set(file.resolvedPath, info.signature || false);
                                            info.signature = signature;
                                        }
                                        else {
                                            info.signature = signature;
                                            (_e = state.oldExportedModulesMap) == null ? void 0 : _e.clear();
                                        }
                                    }
                                }
                            }
                            if (state.compilerOptions.composite) {
                                const filePath = sourceFiles[0].resolvedPath;
                                emitSignature = handleNewSignature((_f = state.emitSignatures) == null ? void 0 : _f.get(filePath), emitSignature);
                                if (!emitSignature)
                                    return;
                                ((_g = state.emitSignatures) != null ? _g : state.emitSignatures = /* @__PURE__ */ new Map()).set(filePath, emitSignature);
                            }
                        }
                        else if (state.compilerOptions.composite) {
                            const newSignature = handleNewSignature(state.outSignature, 
                            /*newSignature*/
                            void 0);
                            if (!newSignature)
                                return;
                            state.outSignature = newSignature;
                        }
                    }
                    if (writeFile2)
                        writeFile2(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
                    else if (host.writeFile)
                        host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
                    else
                        state.program.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
                    function handleNewSignature(oldSignatureFormat, newSignature) {
                        const oldSignature = !oldSignatureFormat || isString(oldSignatureFormat) ? oldSignatureFormat : oldSignatureFormat[0];
                        newSignature != null ? newSignature : newSignature = computeSignature(text, host, data);
                        if (newSignature === oldSignature) {
                            if (oldSignatureFormat === oldSignature)
                                return void 0;
                            else if (data)
                                data.differsOnlyInMap = true;
                            else
                                data = { differsOnlyInMap: true };
                        }
                        else {
                            state.hasChangedEmitSignature = true;
                            state.latestChangedDtsFile = fileName;
                        }
                        return newSignature;
                    }
                };
            }
            function emit(targetSourceFile, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers) {
                if (kind === 1 /* EmitAndSemanticDiagnosticsBuilderProgram */) {
                    assertSourceFileOkWithoutNextAffectedCall(state, targetSourceFile);
                }
                const result = handleNoEmitOptions(builderProgram, targetSourceFile, writeFile2, cancellationToken);
                if (result)
                    return result;
                if (!targetSourceFile) {
                    if (kind === 1 /* EmitAndSemanticDiagnosticsBuilderProgram */) {
                        let sourceMaps = [];
                        let emitSkipped = false;
                        let diagnostics;
                        let emittedFiles = [];
                        let affectedEmitResult;
                        while (affectedEmitResult = emitNextAffectedFile(writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers)) {
                            emitSkipped = emitSkipped || affectedEmitResult.result.emitSkipped;
                            diagnostics = addRange(diagnostics, affectedEmitResult.result.diagnostics);
                            emittedFiles = addRange(emittedFiles, affectedEmitResult.result.emittedFiles);
                            sourceMaps = addRange(sourceMaps, affectedEmitResult.result.sourceMaps);
                        }
                        return {
                            emitSkipped,
                            diagnostics: diagnostics || emptyArray,
                            emittedFiles,
                            sourceMaps
                        };
                    }
                    else {
                        clearAffectedFilesPendingEmit(state, emitOnlyDtsFiles);
                    }
                }
                return Debug.checkDefined(state.program).emit(targetSourceFile, getWriteFileCallback(writeFile2, customTransformers), cancellationToken, emitOnlyDtsFiles, customTransformers);
            }
            function getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile) {
                while (true) {
                    const affected = getNextAffectedFile(state, cancellationToken, host);
                    let result;
                    if (!affected)
                        return void 0;
                    else if (affected !== state.program) {
                        const affectedSourceFile = affected;
                        if (!ignoreSourceFile || !ignoreSourceFile(affectedSourceFile)) {
                            result = getSemanticDiagnosticsOfFile(state, affectedSourceFile, cancellationToken);
                        }
                        state.seenAffectedFiles.add(affectedSourceFile.resolvedPath);
                        state.affectedFilesIndex++;
                        state.buildInfoEmitPending = true;
                        if (!result)
                            continue;
                    }
                    else {
                        result = state.program.getSemanticDiagnostics(
                        /*targetSourceFile*/
                        void 0, cancellationToken);
                        state.changedFilesSet.clear();
                        state.programEmitPending = getBuilderFileEmit(state.compilerOptions);
                    }
                    return { result, affected };
                }
            }
            function getSemanticDiagnostics(sourceFile, cancellationToken) {
                assertSourceFileOkWithoutNextAffectedCall(state, sourceFile);
                const compilerOptions = Debug.checkDefined(state.program).getCompilerOptions();
                if (outFile(compilerOptions)) {
                    Debug.assert(!state.semanticDiagnosticsPerFile);
                    return Debug.checkDefined(state.program).getSemanticDiagnostics(sourceFile, cancellationToken);
                }
                if (sourceFile) {
                    return getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken);
                }
                while (getSemanticDiagnosticsOfNextAffectedFile(cancellationToken)) {
                }
                let diagnostics;
                for (const sourceFile2 of Debug.checkDefined(state.program).getSourceFiles()) {
                    diagnostics = addRange(diagnostics, getSemanticDiagnosticsOfFile(state, sourceFile2, cancellationToken));
                }
                return diagnostics || emptyArray;
            }
        }