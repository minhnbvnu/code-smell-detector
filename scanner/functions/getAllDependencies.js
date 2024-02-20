function getAllDependencies(state, programOfThisState, sourceFile) {
                        const compilerOptions = programOfThisState.getCompilerOptions();
                        if (outFile(compilerOptions)) {
                            return getAllFileNames(state, programOfThisState);
                        }
                        if (!state.referencedMap || isFileAffectingGlobalScope(sourceFile)) {
                            return getAllFileNames(state, programOfThisState);
                        }
                        const seenMap = /* @__PURE__ */ new Set();
                        const queue = [sourceFile.resolvedPath];
                        while (queue.length) {
                            const path = queue.pop();
                            if (!seenMap.has(path)) {
                                seenMap.add(path);
                                const references = state.referencedMap.getValues(path);
                                if (references) {
                                    for (const key of references.keys()) {
                                        queue.push(key);
                                    }
                                }
                            }
                        }
                        return arrayFrom(mapDefinedIterator(seenMap.keys(), (path) => {
                            var _a2, _b;
                            return (_b = (_a2 = programOfThisState.getSourceFileByPath(path)) == null ? void 0 : _a2.fileName) != null ? _b : path;
                        }));
                    }