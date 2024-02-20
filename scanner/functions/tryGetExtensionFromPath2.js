function tryGetExtensionFromPath2(path) {
            return find(extensionsToRemove, (e) => fileExtensionIs(path, e));
        }