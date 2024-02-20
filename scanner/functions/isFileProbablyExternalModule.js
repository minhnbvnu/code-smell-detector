function isFileProbablyExternalModule(sourceFile) {
            return forEach(sourceFile.statements, isAnExternalModuleIndicatorNode) || getImportMetaIfNecessary(sourceFile);
        }