function addExportToChanges(sourceFile, decl, name, changes, useEs6Exports) {
            if (isExported(sourceFile, decl, useEs6Exports, name))
                return;
            if (useEs6Exports) {
                if (!isExpressionStatement(decl))
                    changes.insertExportModifier(sourceFile, decl);
            }
            else {
                const names = getNamesToExportInCommonJS(decl);
                if (names.length !== 0)
                    changes.insertNodesAfter(sourceFile, decl, names.map(createExportAssignment));
            }
        }