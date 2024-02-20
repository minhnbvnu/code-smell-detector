function tryGetExtensionFromPath(path, extension, stringEqualityComparer) {
            if (!startsWith(extension, "."))
                extension = "." + extension;
            if (path.length >= extension.length && path.charCodeAt(path.length - extension.length) === 46 /* dot */) {
                const pathExtension = path.slice(path.length - extension.length);
                if (stringEqualityComparer(pathExtension, extension)) {
                    return pathExtension;
                }
            }
        }