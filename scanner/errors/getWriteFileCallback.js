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