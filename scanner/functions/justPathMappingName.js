function justPathMappingName(name, kind) {
                return startsWith(name, fragment) ? [{ name: removeTrailingDirectorySeparator(name), kind, extension: void 0 }] : emptyArray;
            }