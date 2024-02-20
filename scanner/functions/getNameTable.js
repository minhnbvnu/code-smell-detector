function getNameTable(sourceFile) {
            if (!sourceFile.nameTable) {
                initializeNameTable(sourceFile);
            }
            return sourceFile.nameTable;
        }