function fileExtensionIs(path, extension) {
            return path.length > extension.length && endsWith(path, extension);
        }