function getFileReferenceForSpecifierModeTuple([typeName, mode]) {
                    if (emittedImports) {
                        for (const importStatement of emittedImports) {
                            if (isImportEqualsDeclaration(importStatement) && isExternalModuleReference(importStatement.moduleReference)) {
                                const expr = importStatement.moduleReference.expression;
                                if (isStringLiteralLike(expr) && expr.text === typeName) {
                                    return void 0;
                                }
                            }
                            else if (isImportDeclaration(importStatement) && isStringLiteral(importStatement.moduleSpecifier) && importStatement.moduleSpecifier.text === typeName) {
                                return void 0;
                            }
                        }
                    }
                    return { fileName: typeName, pos: -1, end: -1, ...mode ? { resolutionMode: mode } : void 0 };
                }