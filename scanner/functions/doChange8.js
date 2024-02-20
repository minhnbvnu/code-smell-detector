function doChange8(changes, program, { exportName, node, moduleSourceFile }) {
            const exportDeclaration = tryGetExportDeclaration(moduleSourceFile, exportName.isTypeOnly);
            if (exportDeclaration) {
                updateExport(changes, program, moduleSourceFile, exportDeclaration, [exportName]);
            }
            else if (canHaveExportModifier(node)) {
                changes.insertExportModifier(moduleSourceFile, node);
            }
            else {
                createExport(changes, program, moduleSourceFile, [exportName]);
            }
        }