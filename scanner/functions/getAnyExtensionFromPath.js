function getAnyExtensionFromPath(path, extensions, ignoreCase) {
            if (extensions) {
                return getAnyExtensionFromPathWorker(removeTrailingDirectorySeparator(path), extensions, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive);
            }
            const baseFileName = getBaseFileName(path);
            const extensionIndex = baseFileName.lastIndexOf(".");
            if (extensionIndex >= 0) {
                return baseFileName.substring(extensionIndex);
            }
            return "";
        }