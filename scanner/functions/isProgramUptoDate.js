function isProgramUptoDate(program, rootFileNames, newOptions, getSourceVersion, fileExists, hasInvalidatedResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences) {
            if (!program || (hasChangedAutomaticTypeDirectiveNames == null ? void 0 : hasChangedAutomaticTypeDirectiveNames()))
                return false;
            if (!arrayIsEqualTo(program.getRootFileNames(), rootFileNames))
                return false;
            let seenResolvedRefs;
            if (!arrayIsEqualTo(program.getProjectReferences(), projectReferences, projectReferenceUptoDate))
                return false;
            if (program.getSourceFiles().some(sourceFileNotUptoDate))
                return false;
            if (program.getMissingFilePaths().some(fileExists))
                return false;
            const currentOptions = program.getCompilerOptions();
            if (!compareDataObjects(currentOptions, newOptions))
                return false;
            if (currentOptions.configFile && newOptions.configFile)
                return currentOptions.configFile.text === newOptions.configFile.text;
            return true;
            function sourceFileNotUptoDate(sourceFile) {
                return !sourceFileVersionUptoDate(sourceFile) || hasInvalidatedResolutions(sourceFile.path);
            }
            function sourceFileVersionUptoDate(sourceFile) {
                return sourceFile.version === getSourceVersion(sourceFile.resolvedPath, sourceFile.fileName);
            }
            function projectReferenceUptoDate(oldRef, newRef, index) {
                return projectReferenceIsEqualTo(oldRef, newRef) && resolvedProjectReferenceUptoDate(program.getResolvedProjectReferences()[index], oldRef);
            }
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
        }