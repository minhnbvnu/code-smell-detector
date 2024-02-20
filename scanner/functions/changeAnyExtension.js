function changeAnyExtension(path, ext, extensions, ignoreCase) {
            const pathext = extensions !== void 0 && ignoreCase !== void 0 ? getAnyExtensionFromPath(path, extensions, ignoreCase) : getAnyExtensionFromPath(path);
            return pathext ? path.slice(0, path.length - pathext.length) + (startsWith(ext, ".") ? ext : "." + ext) : path;
        }