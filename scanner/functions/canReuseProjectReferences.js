function canReuseProjectReferences() {
                return !forEachProjectReference(oldProgram.getProjectReferences(), oldProgram.getResolvedProjectReferences(), (oldResolvedRef, parent2, index) => {
                    const newRef = (parent2 ? parent2.commandLine.projectReferences : projectReferences)[index];
                    const newResolvedRef = parseProjectReferenceConfigFile(newRef);
                    if (oldResolvedRef) {
                        return !newResolvedRef || newResolvedRef.sourceFile !== oldResolvedRef.sourceFile || !arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newResolvedRef.commandLine.fileNames);
                    }
                    else {
                        return newResolvedRef !== void 0;
                    }
                }, (oldProjectReferences, parent2) => {
                    const newReferences = parent2 ? getResolvedProjectReferenceByPath(parent2.sourceFile.path).commandLine.projectReferences : projectReferences;
                    return !arrayIsEqualTo(oldProjectReferences, newReferences, projectReferenceIsEqualTo);
                });
            }