function resolvedProjectReferenceUptoDate(oldResolvedRef, oldRef) {
                if (oldResolvedRef) {
                    if (contains(seenResolvedRefs, oldResolvedRef))
                        return true;
                    const refPath2 = resolveProjectReferencePath(oldRef);
                    const newParsedCommandLine = getParsedCommandLine(refPath2);
                    if (!newParsedCommandLine)
                        return false;
                    if (oldResolvedRef.commandLine.options.configFile !== newParsedCommandLine.options.configFile)
                        return false;
                    if (!arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newParsedCommandLine.fileNames))
                        return false;
                    (seenResolvedRefs || (seenResolvedRefs = [])).push(oldResolvedRef);
                    return !forEach(oldResolvedRef.references, (childResolvedRef, index) => !resolvedProjectReferenceUptoDate(childResolvedRef, oldResolvedRef.commandLine.projectReferences[index]));
                }
                const refPath = resolveProjectReferencePath(oldRef);
                return !getParsedCommandLine(refPath);
            }