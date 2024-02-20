function inlineExportModifiers(statements) {
                        const index = findIndex(statements, (d) => isExportDeclaration(d) && !d.moduleSpecifier && !d.assertClause && !!d.exportClause && isNamedExports(d.exportClause));
                        if (index >= 0) {
                            const exportDecl = statements[index];
                            const replacements = mapDefined(exportDecl.exportClause.elements, (e) => {
                                if (!e.propertyName) {
                                    const indices = indicesOf(statements);
                                    const associatedIndices = filter(indices, (i) => nodeHasName(statements[i], e.name));
                                    if (length(associatedIndices) && every(associatedIndices, (i) => canHaveExportModifier(statements[i]))) {
                                        for (const index2 of associatedIndices) {
                                            statements[index2] = addExportModifier(statements[index2]);
                                        }
                                        return void 0;
                                    }
                                }
                                return e;
                            });
                            if (!length(replacements)) {
                                orderedRemoveItemAt(statements, index);
                            }
                            else {
                                statements[index] = factory.updateExportDeclaration(exportDecl, exportDecl.modifiers, exportDecl.isTypeOnly, factory.updateNamedExports(exportDecl.exportClause, replacements), exportDecl.moduleSpecifier, exportDecl.assertClause);
                            }
                        }
                        return statements;
                    }