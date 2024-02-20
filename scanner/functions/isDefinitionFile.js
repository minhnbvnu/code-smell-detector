function isDefinitionFile(fileName) {
        const lowerFileName = fileName.toLowerCase();
        for (const definitionExt of DEFINITION_EXTENSIONS) {
            if (lowerFileName.endsWith(definitionExt)) {
                return true;
            }
        }
        return false;
    }