function createBuilderProgramState(newProgram, oldState) {
            var _a2, _b;
            const state = BuilderState.create(newProgram, oldState, 
            /*disableUseFileVersionAsSignature*/
            false);
            state.program = newProgram;
            const compilerOptions = newProgram.getCompilerOptions();
            state.compilerOptions = compilerOptions;
            const outFilePath = outFile(compilerOptions);
            if (!outFilePath) {
                state.semanticDiagnosticsPerFile = /* @__PURE__ */ new Map();
            }
            else if (compilerOptions.composite && (oldState == null ? void 0 : oldState.outSignature) && outFilePath === outFile(oldState == null ? void 0 : oldState.compilerOptions)) {
                state.outSignature = oldState.outSignature && getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldState.outSignature);
            }
            state.changedFilesSet = /* @__PURE__ */ new Set();
            state.latestChangedDtsFile = compilerOptions.composite ? oldState == null ? void 0 : oldState.latestChangedDtsFile : void 0;
            const useOldState = BuilderState.canReuseOldState(state.referencedMap, oldState);
            const oldCompilerOptions = useOldState ? oldState.compilerOptions : void 0;
            const canCopySemanticDiagnostics = useOldState && oldState.semanticDiagnosticsPerFile && !!state.semanticDiagnosticsPerFile && !compilerOptionsAffectSemanticDiagnostics(compilerOptions, oldCompilerOptions);
            const canCopyEmitSignatures = compilerOptions.composite && (oldState == null ? void 0 : oldState.emitSignatures) && !outFilePath && !compilerOptionsAffectDeclarationPath(compilerOptions, oldState.compilerOptions);
            if (useOldState) {
                (_a2 = oldState.changedFilesSet) == null ? void 0 : _a2.forEach((value) => state.changedFilesSet.add(value));
                if (!outFilePath && ((_b = oldState.affectedFilesPendingEmit) == null ? void 0 : _b.size)) {
                    state.affectedFilesPendingEmit = new Map(oldState.affectedFilesPendingEmit);
                    state.seenAffectedFiles = /* @__PURE__ */ new Set();
                }
                state.programEmitPending = oldState.programEmitPending;
            }
            else {
                state.buildInfoEmitPending = true;
            }
            const referencedMap = state.referencedMap;
            const oldReferencedMap = useOldState ? oldState.referencedMap : void 0;
            const copyDeclarationFileDiagnostics = canCopySemanticDiagnostics && !compilerOptions.skipLibCheck === !oldCompilerOptions.skipLibCheck;
            const copyLibFileDiagnostics = copyDeclarationFileDiagnostics && !compilerOptions.skipDefaultLibCheck === !oldCompilerOptions.skipDefaultLibCheck;
            state.fileInfos.forEach((info, sourceFilePath) => {
                var _a3;
                let oldInfo;
                let newReferences;
                if (!useOldState || // File wasn't present in old state
                    !(oldInfo = oldState.fileInfos.get(sourceFilePath)) || // versions dont match
                    oldInfo.version !== info.version || // Implied formats dont match
                    oldInfo.impliedFormat !== info.impliedFormat || // Referenced files changed
                    !hasSameKeys(newReferences = referencedMap && referencedMap.getValues(sourceFilePath), oldReferencedMap && oldReferencedMap.getValues(sourceFilePath)) || // Referenced file was deleted in the new program
                    newReferences && forEachKey(newReferences, (path) => !state.fileInfos.has(path) && oldState.fileInfos.has(path))) {
                    addFileToChangeSet(state, sourceFilePath);
                }
                else if (canCopySemanticDiagnostics) {
                    const sourceFile = newProgram.getSourceFileByPath(sourceFilePath);
                    if (sourceFile.isDeclarationFile && !copyDeclarationFileDiagnostics)
                        return;
                    if (sourceFile.hasNoDefaultLib && !copyLibFileDiagnostics)
                        return;
                    const diagnostics = oldState.semanticDiagnosticsPerFile.get(sourceFilePath);
                    if (diagnostics) {
                        state.semanticDiagnosticsPerFile.set(sourceFilePath, oldState.hasReusableDiagnostic ? convertToDiagnostics(diagnostics, newProgram) : diagnostics);
                        if (!state.semanticDiagnosticsFromOldState) {
                            state.semanticDiagnosticsFromOldState = /* @__PURE__ */ new Set();
                        }
                        state.semanticDiagnosticsFromOldState.add(sourceFilePath);
                    }
                }
                if (canCopyEmitSignatures) {
                    const oldEmitSignature = oldState.emitSignatures.get(sourceFilePath);
                    if (oldEmitSignature) {
                        ((_a3 = state.emitSignatures) != null ? _a3 : state.emitSignatures = /* @__PURE__ */ new Map()).set(sourceFilePath, getEmitSignatureFromOldSignature(compilerOptions, oldState.compilerOptions, oldEmitSignature));
                    }
                }
            });
            if (useOldState && forEachEntry(oldState.fileInfos, (info, sourceFilePath) => {
                if (state.fileInfos.has(sourceFilePath))
                    return false;
                if (outFilePath || info.affectsGlobalScope)
                    return true;
                state.buildInfoEmitPending = true;
                return false;
            })) {
                BuilderState.getAllFilesExcludingDefaultLibraryFile(state, newProgram, 
                /*firstSourceFile*/
                void 0).forEach((file) => addFileToChangeSet(state, file.resolvedPath));
            }
            else if (oldCompilerOptions) {
                const pendingEmitKind = compilerOptionsAffectEmit(compilerOptions, oldCompilerOptions) ? getBuilderFileEmit(compilerOptions) : getPendingEmitKind(compilerOptions, oldCompilerOptions);
                if (pendingEmitKind !== 0 /* None */) {
                    if (!outFilePath) {
                        newProgram.getSourceFiles().forEach((f) => {
                            if (!state.changedFilesSet.has(f.resolvedPath)) {
                                addToAffectedFilesPendingEmit(state, f.resolvedPath, pendingEmitKind);
                            }
                        });
                        Debug.assert(!state.seenAffectedFiles || !state.seenAffectedFiles.size);
                        state.seenAffectedFiles = state.seenAffectedFiles || /* @__PURE__ */ new Set();
                        state.buildInfoEmitPending = true;
                    }
                    else {
                        state.programEmitPending = state.programEmitPending ? state.programEmitPending | pendingEmitKind : pendingEmitKind;
                    }
                }
            }
            if (outFilePath && !state.changedFilesSet.size) {
                if (useOldState)
                    state.bundle = oldState.bundle;
                if (some(newProgram.getProjectReferences(), (ref) => !!ref.prepend))
                    state.programEmitPending = getBuilderFileEmit(compilerOptions);
            }
            return state;
        }