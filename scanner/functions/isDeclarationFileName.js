function isDeclarationFileName(fileName) {
            return fileExtensionIsOneOf(fileName, supportedDeclarationExtensions) || fileExtensionIs(fileName, ".ts" /* Ts */) && stringContains(getBaseFileName(fileName), ".d.");
        }