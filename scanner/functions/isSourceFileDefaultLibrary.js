function isSourceFileDefaultLibrary(file) {
                if (!file.isDeclarationFile) {
                    return false;
                }
                if (file.hasNoDefaultLib) {
                    return true;
                }
                if (!options.noLib) {
                    return false;
                }
                const equalityComparer = host.useCaseSensitiveFileNames() ? equateStringsCaseSensitive : equateStringsCaseInsensitive;
                if (!options.lib) {
                    return equalityComparer(file.fileName, getDefaultLibraryFileName());
                }
                else {
                    return some(options.lib, (libFileName) => equalityComparer(file.fileName, pathForLibFile(libFileName)));
                }
            }