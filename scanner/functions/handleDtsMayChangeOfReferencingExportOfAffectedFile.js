function handleDtsMayChangeOfReferencingExportOfAffectedFile(state, affectedFile, cancellationToken, host) {
            var _a2;
            if (!state.exportedModulesMap || !state.changedFilesSet.has(affectedFile.resolvedPath))
                return;
            if (!isChangedSignature(state, affectedFile.resolvedPath))
                return;
            if (getIsolatedModules(state.compilerOptions)) {
                const seenFileNamesMap = /* @__PURE__ */ new Map();
                seenFileNamesMap.set(affectedFile.resolvedPath, true);
                const queue = BuilderState.getReferencedByPaths(state, affectedFile.resolvedPath);
                while (queue.length > 0) {
                    const currentPath = queue.pop();
                    if (!seenFileNamesMap.has(currentPath)) {
                        seenFileNamesMap.set(currentPath, true);
                        if (handleDtsMayChangeOfGlobalScope(state, currentPath, cancellationToken, host))
                            return;
                        handleDtsMayChangeOf(state, currentPath, cancellationToken, host);
                        if (isChangedSignature(state, currentPath)) {
                            const currentSourceFile = Debug.checkDefined(state.program).getSourceFileByPath(currentPath);
                            queue.push(...BuilderState.getReferencedByPaths(state, currentSourceFile.resolvedPath));
                        }
                    }
                }
            }
            const seenFileAndExportsOfFile = /* @__PURE__ */ new Set();
            (_a2 = state.exportedModulesMap.getKeys(affectedFile.resolvedPath)) == null ? void 0 : _a2.forEach((exportedFromPath) => {
                if (handleDtsMayChangeOfGlobalScope(state, exportedFromPath, cancellationToken, host))
                    return true;
                const references = state.referencedMap.getKeys(exportedFromPath);
                return references && forEachKey(references, (filePath) => handleDtsMayChangeOfFileAndExportsOfFile(state, filePath, seenFileAndExportsOfFile, cancellationToken, host));
            });
        }