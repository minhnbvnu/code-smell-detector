function findImportLikeNodes(sourceFile, kinds, ignoreFileName = true) {
        return new ImportFinder(sourceFile, kinds, ignoreFileName).find();
    }