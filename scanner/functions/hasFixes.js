function hasFixes() {
                return addToNamespace.length > 0 || importType.length > 0 || addToExisting.size > 0 || newImports.size > 0;
            }