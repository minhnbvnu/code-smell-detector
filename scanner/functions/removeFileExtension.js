function removeFileExtension(path) {
            for (const ext of extensionsToRemove) {
                const extensionless = tryRemoveExtension(path, ext);
                if (extensionless !== void 0) {
                    return extensionless;
                }
            }
            return path;
        }