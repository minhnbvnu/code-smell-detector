function flattenExportAssignedNamespace(statements) {
                        const exportAssignment = find(statements, isExportAssignment);
                        const nsIndex = findIndex(statements, isModuleDeclaration);
                        let ns = nsIndex !== -1 ? statements[nsIndex] : void 0;
                        if (ns && exportAssignment && exportAssignment.isExportEquals && isIdentifier(exportAssignment.expression) && isIdentifier(ns.name) && idText(ns.name) === idText(exportAssignment.expression) && ns.body && isModuleBlock(ns.body)) {
                            const excessExports = filter(statements, (s) => !!(getEffectiveModifierFlags(s) & 1 /* Export */));
                            const name = ns.name;
                            let body = ns.body;
                            if (length(excessExports)) {
                                ns = factory.updateModuleDeclaration(ns, ns.modifiers, ns.name, body = factory.updateModuleBlock(body, factory.createNodeArray([...ns.body.statements, factory.createExportDeclaration(
                                    /*modifiers*/
                                    void 0, 
                                    /*isTypeOnly*/
                                    false, factory.createNamedExports(map(flatMap(excessExports, (e) => getNamesOfDeclaration(e)), (id) => factory.createExportSpecifier(
                                    /*isTypeOnly*/
                                    false, 
                                    /*alias*/
                                    void 0, id))), 
                                    /*moduleSpecifier*/
                                    void 0)])));
                                statements = [...statements.slice(0, nsIndex), ns, ...statements.slice(nsIndex + 1)];
                            }
                            if (!find(statements, (s) => s !== ns && nodeHasName(s, name))) {
                                results = [];
                                const mixinExportFlag = !some(body.statements, (s) => hasSyntacticModifier(s, 1 /* Export */) || isExportAssignment(s) || isExportDeclaration(s));
                                forEach(body.statements, (s) => {
                                    addResult(s, mixinExportFlag ? 1 /* Export */ : 0 /* None */);
                                });
                                statements = [...filter(statements, (s) => s !== ns && s !== exportAssignment), ...results];
                            }
                        }
                        return statements;
                    }