function forEachImport(sourceFile, action) {
            if (sourceFile.externalModuleIndicator || sourceFile.imports !== void 0) {
                for (const i of sourceFile.imports) {
                    action(importFromModuleSpecifier(i), i);
                }
            }
            else {
                forEachPossibleImportOrExportStatement(sourceFile, (statement) => {
                    switch (statement.kind) {
                        case 275 /* ExportDeclaration */:
                        case 269 /* ImportDeclaration */: {
                            const decl = statement;
                            if (decl.moduleSpecifier && isStringLiteral(decl.moduleSpecifier)) {
                                action(decl, decl.moduleSpecifier);
                            }
                            break;
                        }
                        case 268 /* ImportEqualsDeclaration */: {
                            const decl = statement;
                            if (isExternalModuleImportEquals(decl)) {
                                action(decl, decl.moduleReference.expression);
                            }
                            break;
                        }
                    }
                });
            }
        }