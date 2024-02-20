function setExternalModuleIndicator(sourceFile) {
            sourceFile.externalModuleIndicator = isFileProbablyExternalModule(sourceFile);
        }