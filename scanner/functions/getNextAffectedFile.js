function getNextAffectedFile(state, cancellationToken, host) {
            var _a2, _b;
            while (true) {
                const { affectedFiles } = state;
                if (affectedFiles) {
                    const seenAffectedFiles = state.seenAffectedFiles;
                    let affectedFilesIndex = state.affectedFilesIndex;
                    while (affectedFilesIndex < affectedFiles.length) {
                        const affectedFile = affectedFiles[affectedFilesIndex];
                        if (!seenAffectedFiles.has(affectedFile.resolvedPath)) {
                            state.affectedFilesIndex = affectedFilesIndex;
                            addToAffectedFilesPendingEmit(state, affectedFile.resolvedPath, getBuilderFileEmit(state.compilerOptions));
                            handleDtsMayChangeOfAffectedFile(state, affectedFile, cancellationToken, host);
                            return affectedFile;
                        }
                        affectedFilesIndex++;
                    }
                    state.changedFilesSet.delete(state.currentChangedFilePath);
                    state.currentChangedFilePath = void 0;
                    (_a2 = state.oldSignatures) == null ? void 0 : _a2.clear();
                    (_b = state.oldExportedModulesMap) == null ? void 0 : _b.clear();
                    state.affectedFiles = void 0;
                }
                const nextKey = state.changedFilesSet.keys().next();
                if (nextKey.done) {
                    return void 0;
                }
                const program = Debug.checkDefined(state.program);
                const compilerOptions = program.getCompilerOptions();
                if (outFile(compilerOptions)) {
                    Debug.assert(!state.semanticDiagnosticsPerFile);
                    return program;
                }
                state.affectedFiles = BuilderState.getFilesAffectedByWithOldState(state, program, nextKey.value, cancellationToken, host);
                state.currentChangedFilePath = nextKey.value;
                state.affectedFilesIndex = 0;
                if (!state.seenAffectedFiles)
                    state.seenAffectedFiles = /* @__PURE__ */ new Set();
            }
        }