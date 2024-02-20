function tryRemoveExtension(path, extension) {
            return fileExtensionIs(path, extension) ? removeExtension(path, extension) : void 0;
        }