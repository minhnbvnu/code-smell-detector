function checkExportSpecifier(node) {
                checkAliasSymbol(node);
                if (getEmitDeclarations(compilerOptions)) {
                    collectLinkedAliases(node.propertyName || node.name, 
                    /*setVisibility*/
                    true);
                }
                if (!node.parent.parent.moduleSpecifier) {
                    const exportedName = node.propertyName || node.name;
                    const symbol = resolveName(exportedName, exportedName.escapedText, 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */ | 2097152 /* Alias */, 
                    /*nameNotFoundMessage*/
                    void 0, 
                    /*nameArg*/
                    void 0, 
                    /*isUse*/
                    true);
                    if (symbol && (symbol === undefinedSymbol || symbol === globalThisSymbol || symbol.declarations && isGlobalSourceFile(getDeclarationContainer(symbol.declarations[0])))) {
                        error(exportedName, Diagnostics.Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module, idText(exportedName));
                    }
                    else {
                        if (!node.isTypeOnly && !node.parent.parent.isTypeOnly) {
                            markExportAsReferenced(node);
                        }
                        const target = symbol && (symbol.flags & 2097152 /* Alias */ ? resolveAlias(symbol) : symbol);
                        if (!target || getAllSymbolFlags(target) & 111551 /* Value */) {
                            checkExpressionCached(node.propertyName || node.name);
                        }
                    }
                }
                else {
                    if (getESModuleInterop(compilerOptions) && moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */) && idText(node.propertyName || node.name) === "default") {
                        checkExternalEmitHelpers(node, 131072 /* ImportDefault */);
                    }
                }
            }