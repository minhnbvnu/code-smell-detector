function serializeModule(symbol, symbolName2, modifierFlags) {
                        const members = getNamespaceMembersForSerialization(symbol);
                        const locationMap = arrayToMultiMap(members, (m) => m.parent && m.parent === symbol ? "real" : "merged");
                        const realMembers = locationMap.get("real") || emptyArray;
                        const mergedMembers = locationMap.get("merged") || emptyArray;
                        if (length(realMembers)) {
                            const localName = getInternalSymbolName(symbol, symbolName2);
                            serializeAsNamespaceDeclaration(realMembers, localName, modifierFlags, !!(symbol.flags & (16 /* Function */ | 67108864 /* Assignment */)));
                        }
                        if (length(mergedMembers)) {
                            const containingFile = getSourceFileOfNode(context.enclosingDeclaration);
                            const localName = getInternalSymbolName(symbol, symbolName2);
                            const nsBody = factory.createModuleBlock([factory.createExportDeclaration(
                                /*modifiers*/
                                void 0, 
                                /*isTypeOnly*/
                                false, factory.createNamedExports(mapDefined(filter(mergedMembers, (n) => n.escapedName !== "export=" /* ExportEquals */), (s) => {
                                    var _a2, _b;
                                    const name = unescapeLeadingUnderscores(s.escapedName);
                                    const localName2 = getInternalSymbolName(s, name);
                                    const aliasDecl = s.declarations && getDeclarationOfAliasSymbol(s);
                                    if (containingFile && (aliasDecl ? containingFile !== getSourceFileOfNode(aliasDecl) : !some(s.declarations, (d) => getSourceFileOfNode(d) === containingFile))) {
                                        (_b = (_a2 = context.tracker) == null ? void 0 : _a2.reportNonlocalAugmentation) == null ? void 0 : _b.call(_a2, containingFile, symbol, s);
                                        return void 0;
                                    }
                                    const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, 
                                    /*dontRecursivelyResolve*/
                                    true);
                                    includePrivateSymbol(target || s);
                                    const targetName = target ? getInternalSymbolName(target, unescapeLeadingUnderscores(target.escapedName)) : localName2;
                                    return factory.createExportSpecifier(
                                    /*isTypeOnly*/
                                    false, name === targetName ? void 0 : targetName, name);
                                })))]);
                            addResult(factory.createModuleDeclaration(
                            /*modifiers*/
                            void 0, factory.createIdentifier(localName), nsBody, 16 /* Namespace */), 0 /* None */);
                        }
                    }