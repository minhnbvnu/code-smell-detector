function getFilesAffectedByUpdatedShapeWhenModuleEmit(state, programOfThisState, sourceFileWithUpdatedShape, cancellationToken, host) {
                        if (isFileAffectingGlobalScope(sourceFileWithUpdatedShape)) {
                            return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
                        }
                        const compilerOptions = programOfThisState.getCompilerOptions();
                        if (compilerOptions && (getIsolatedModules(compilerOptions) || outFile(compilerOptions))) {
                            return [sourceFileWithUpdatedShape];
                        }
                        const seenFileNamesMap = /* @__PURE__ */ new Map();
                        seenFileNamesMap.set(sourceFileWithUpdatedShape.resolvedPath, sourceFileWithUpdatedShape);
                        const queue = getReferencedByPaths(state, sourceFileWithUpdatedShape.resolvedPath);
                        while (queue.length > 0) {
                            const currentPath = queue.pop();
                            if (!seenFileNamesMap.has(currentPath)) {
                                const currentSourceFile = programOfThisState.getSourceFileByPath(currentPath);
                                seenFileNamesMap.set(currentPath, currentSourceFile);
                                if (currentSourceFile && updateShapeSignature(state, programOfThisState, currentSourceFile, cancellationToken, host)) {
                                    queue.push(...getReferencedByPaths(state, currentSourceFile.resolvedPath));
                                }
                            }
                        }
                        return arrayFrom(mapDefinedIterator(seenFileNamesMap.values(), (value) => value));
                    }