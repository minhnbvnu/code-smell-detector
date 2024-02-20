function hasTSFileExtension(fileName) {
            return some(supportedTSExtensionsFlat, (extension) => fileExtensionIs(fileName, extension));
        }