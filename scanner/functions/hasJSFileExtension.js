function hasJSFileExtension(fileName) {
            return some(supportedJSExtensionsFlat, (extension) => fileExtensionIs(fileName, extension));
        }