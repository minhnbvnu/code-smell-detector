function markAsExternalModuleIfTopLevel() {
                if (braceNesting === 0) {
                    externalModule = true;
                }
            }