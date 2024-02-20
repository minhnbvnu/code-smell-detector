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