function extensionFromPath(path) {
            const ext = tryGetExtensionFromPath2(path);
            return ext !== void 0 ? ext : Debug.fail(`File ${path} has unknown extension.`);
        }