function tryExtractTSExtension(fileName) {
            return find(supportedTSExtensionsForExtractExtension, (extension) => fileExtensionIs(fileName, extension));
        }