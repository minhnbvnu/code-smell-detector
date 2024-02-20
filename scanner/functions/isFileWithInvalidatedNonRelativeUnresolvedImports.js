function isFileWithInvalidatedNonRelativeUnresolvedImports(path) {
                if (!filesWithInvalidatedNonRelativeUnresolvedImports) {
                    return false;
                }
                const value = filesWithInvalidatedNonRelativeUnresolvedImports.get(path);
                return !!value && !!value.length;
            }