function addExportStarIfNeeded(statements) {
                if (!moduleInfo.hasExportStarsToExportValues) {
                    return;
                }
                if (!moduleInfo.exportedNames && moduleInfo.exportSpecifiers.size === 0) {
                    let hasExportDeclarationWithExportClause = false;
                    for (const externalImport of moduleInfo.externalImports) {
                        if (externalImport.kind === 275 /* ExportDeclaration */ && externalImport.exportClause) {
                            hasExportDeclarationWithExportClause = true;
                            break;
                        }
                    }
                    if (!hasExportDeclarationWithExportClause) {
                        const exportStarFunction2 = createExportStarFunction(
                        /*localNames*/
                        void 0);
                        statements.push(exportStarFunction2);
                        return exportStarFunction2.name;
                    }
                }
                const exportedNames = [];
                if (moduleInfo.exportedNames) {
                    for (const exportedLocalName of moduleInfo.exportedNames) {
                        if (exportedLocalName.escapedText === "default") {
                            continue;
                        }
                        exportedNames.push(factory2.createPropertyAssignment(factory2.createStringLiteralFromNode(exportedLocalName), factory2.createTrue()));
                    }
                }
                const exportedNamesStorageRef = factory2.createUniqueName("exportedNames");
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(exportedNamesStorageRef, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createObjectLiteralExpression(exportedNames, 
                    /*multiline*/
                    true))
                ])));
                const exportStarFunction = createExportStarFunction(exportedNamesStorageRef);
                statements.push(exportStarFunction);
                return exportStarFunction.name;
            }