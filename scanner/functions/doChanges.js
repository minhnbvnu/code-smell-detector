function doChanges(changes, program, sourceFile, moduleExports, node) {
            if (length(moduleExports)) {
                if (node) {
                    updateExport(changes, program, sourceFile, node, moduleExports);
                }
                else {
                    createExport(changes, program, sourceFile, moduleExports);
                }
            }
        }