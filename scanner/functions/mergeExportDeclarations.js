function mergeExportDeclarations(statements) {
                        const exports = filter(statements, (d) => isExportDeclaration(d) && !d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause));
                        if (length(exports) > 1) {
                            const nonExports = filter(statements, (d) => !isExportDeclaration(d) || !!d.moduleSpecifier || !d.exportClause);
                            statements = [...nonExports, factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamedExports(flatMap(exports, (e) => cast(e.exportClause, isNamedExports).elements)), 
                                /*moduleSpecifier*/
                                void 0)];
                        }
                        const reexports = filter(statements, (d) => isExportDeclaration(d) && !!d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause));
                        if (length(reexports) > 1) {
                            const groups = group(reexports, (decl) => isStringLiteral(decl.moduleSpecifier) ? ">" + decl.moduleSpecifier.text : ">");
                            if (groups.length !== reexports.length) {
                                for (const group2 of groups) {
                                    if (group2.length > 1) {
                                        statements = [
                                            ...filter(statements, (s) => group2.indexOf(s) === -1),
                                            factory.createExportDeclaration(
                                            /*modifiers*/
                                            void 0, 
                                            /*isTypeOnly*/
                                            false, factory.createNamedExports(flatMap(group2, (e) => cast(e.exportClause, isNamedExports).elements)), group2[0].moduleSpecifier)
                                        ];
                                    }
                                }
                            }
                        }
                        return statements;
                    }