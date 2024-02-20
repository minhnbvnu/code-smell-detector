function createLanguageServiceSourceFile(fileName, scriptSnapshot, scriptTargetOrOptions, version2, setNodeParents, scriptKind) {
            const sourceFile = createSourceFile(fileName, getSnapshotText(scriptSnapshot), scriptTargetOrOptions, setNodeParents, scriptKind);
            setSourceFileFields(sourceFile, scriptSnapshot, version2);
            return sourceFile;
        }