function getAnyExtensionFromPathWorker(path, extensions, stringEqualityComparer) {
            if (typeof extensions === "string") {
                return tryGetExtensionFromPath(path, extensions, stringEqualityComparer) || "";
            }
            for (const extension of extensions) {
                const result = tryGetExtensionFromPath(path, extension, stringEqualityComparer);
                if (result)
                    return result;
            }
            return "";
        }