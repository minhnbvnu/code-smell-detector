function getFilesAffectedBy(state, programOfThisState, path, cancellationToken, host) {
                        var _a2, _b;
                        const result = getFilesAffectedByWithOldState(state, programOfThisState, path, cancellationToken, host);
                        (_a2 = state.oldSignatures) == null ? void 0 : _a2.clear();
                        (_b = state.oldExportedModulesMap) == null ? void 0 : _b.clear();
                        return result;
                    }