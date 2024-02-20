function recordAmbientExternalModule() {
                if (!ambientExternalModules) {
                    ambientExternalModules = [];
                }
                ambientExternalModules.push({ ref: getFileReference(), depth: braceNesting });
            }