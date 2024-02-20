function createExtensionRegExp(extensions) {
        if (extensions) {
            const normalizedExts = extensions.map(ext => escapeRegExp(ext.startsWith(".")
                ? ext.slice(1)
                : ext));
            return new RegExp(`.\\.(?:${normalizedExts.join("|")})$`, "u");
        }
        return null;
    }