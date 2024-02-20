function fileExtensionIsOneOf(path, extensions) {
            for (const extension of extensions) {
                if (fileExtensionIs(path, extension)) {
                    return true;
                }
            }
            return false;
        }