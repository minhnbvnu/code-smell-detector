function forEachProjectReference(projectReferences, resolvedProjectReferences, cbResolvedRef, cbRef) {
            let seenResolvedRefs;
            return worker(projectReferences, resolvedProjectReferences, 
            /*parent*/
            void 0);
            function worker(projectReferences2, resolvedProjectReferences2, parent2) {
                if (cbRef) {
                    const result = cbRef(projectReferences2, parent2);
                    if (result)
                        return result;
                }
                return forEach(resolvedProjectReferences2, (resolvedRef, index) => {
                    if (resolvedRef && (seenResolvedRefs == null ? void 0 : seenResolvedRefs.has(resolvedRef.sourceFile.path))) {
                        return void 0;
                    }
                    const result = cbResolvedRef(resolvedRef, parent2, index);
                    if (result || !resolvedRef)
                        return result;
                    (seenResolvedRefs || (seenResolvedRefs = /* @__PURE__ */ new Set())).add(resolvedRef.sourceFile.path);
                    return worker(resolvedRef.commandLine.projectReferences, resolvedRef.references, resolvedRef);
                });
            }
        }