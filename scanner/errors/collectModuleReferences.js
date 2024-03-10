function collectModuleReferences(node, inAmbientModule) {
                    if (isAnyImportOrReExport(node)) {
                        const moduleNameExpr = getExternalModuleName(node);
                        if (moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text && (!inAmbientModule || !isExternalModuleNameRelative(moduleNameExpr.text))) {
                            setParentRecursive(node, 
                            /*incremental*/
                            false);
                            imports = append(imports, moduleNameExpr);
                            if (!usesUriStyleNodeCoreModules && currentNodeModulesDepth === 0 && !file.isDeclarationFile) {
                                usesUriStyleNodeCoreModules = startsWith(moduleNameExpr.text, "node:");
                            }
                        }
                    }
                    else if (isModuleDeclaration(node)) {
                        if (isAmbientModule(node) && (inAmbientModule || hasSyntacticModifier(node, 2 /* Ambient */) || file.isDeclarationFile)) {
                            node.name.parent = node;
                            const nameText = getTextOfIdentifierOrLiteral(node.name);
                            if (isExternalModuleFile || inAmbientModule && !isExternalModuleNameRelative(nameText)) {
                                (moduleAugmentations || (moduleAugmentations = [])).push(node.name);
                            }
                            else if (!inAmbientModule) {
                                if (file.isDeclarationFile) {
                                    (ambientModules || (ambientModules = [])).push(nameText);
                                }
                                const body = node.body;
                                if (body) {
                                    for (const statement of body.statements) {
                                        collectModuleReferences(statement, 
                                        /*inAmbientModule*/
                                        true);
                                    }
                                }
                            }
                        }
                    }
                }