function updateShapeSignature(state, programOfThisState, sourceFile, cancellationToken, host, useFileVersionAsSignature = state.useFileVersionAsSignature) {
                        var _a2;
                        if ((_a2 = state.hasCalledUpdateShapeSignature) == null ? void 0 : _a2.has(sourceFile.resolvedPath))
                            return false;
                        const info = state.fileInfos.get(sourceFile.resolvedPath);
                        const prevSignature = info.signature;
                        let latestSignature;
                        if (!sourceFile.isDeclarationFile && !useFileVersionAsSignature) {
                            computeDtsSignature(programOfThisState, sourceFile, cancellationToken, host, (signature, sourceFiles) => {
                                latestSignature = signature;
                                if (latestSignature !== prevSignature) {
                                    updateExportedModules(state, sourceFile, sourceFiles[0].exportedModulesFromDeclarationEmit);
                                }
                            });
                        }
                        if (latestSignature === void 0) {
                            latestSignature = sourceFile.version;
                            if (state.exportedModulesMap && latestSignature !== prevSignature) {
                                (state.oldExportedModulesMap || (state.oldExportedModulesMap = /* @__PURE__ */ new Map())).set(sourceFile.resolvedPath, state.exportedModulesMap.getValues(sourceFile.resolvedPath) || false);
                                const references = state.referencedMap ? state.referencedMap.getValues(sourceFile.resolvedPath) : void 0;
                                if (references) {
                                    state.exportedModulesMap.set(sourceFile.resolvedPath, references);
                                }
                                else {
                                    state.exportedModulesMap.deleteKey(sourceFile.resolvedPath);
                                }
                            }
                        }
                        (state.oldSignatures || (state.oldSignatures = /* @__PURE__ */ new Map())).set(sourceFile.resolvedPath, prevSignature || false);
                        (state.hasCalledUpdateShapeSignature || (state.hasCalledUpdateShapeSignature = /* @__PURE__ */ new Set())).add(sourceFile.resolvedPath);
                        info.signature = latestSignature;
                        return latestSignature !== prevSignature;
                    }