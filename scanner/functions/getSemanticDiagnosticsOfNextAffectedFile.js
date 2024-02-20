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