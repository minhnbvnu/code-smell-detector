function resolvedIfExtensionMatches(extensions, path, resolvedUsingTsExtension) {
            const ext = tryGetExtensionFromPath2(path);
            return ext !== void 0 && extensionIsOk(extensions, ext) ? { path, ext, resolvedUsingTsExtension } : void 0;
        }