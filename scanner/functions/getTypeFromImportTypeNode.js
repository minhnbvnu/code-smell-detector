function getTypeFromImportTypeNode(node) {
                var _a2;
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    if (!isLiteralImportTypeNode(node)) {
                        error(node.argument, Diagnostics.String_literal_expected);
                        links.resolvedSymbol = unknownSymbol;
                        return links.resolvedType = errorType;
                    }
                    const targetMeaning = node.isTypeOf ? 111551 /* Value */ : node.flags & 8388608 /* JSDoc */ ? 111551 /* Value */ | 788968 /* Type */ : 788968 /* Type */;
                    const innerModuleSymbol = resolveExternalModuleName(node, node.argument.literal);
                    if (!innerModuleSymbol) {
                        links.resolvedSymbol = unknownSymbol;
                        return links.resolvedType = errorType;
                    }
                    const isExportEquals = !!((_a2 = innerModuleSymbol.exports) == null ? void 0 : _a2.get("export=" /* ExportEquals */));
                    const moduleSymbol = resolveExternalModuleSymbol(innerModuleSymbol, 
                    /*dontResolveAlias*/
                    false);
                    if (!nodeIsMissing(node.qualifier)) {
                        const nameStack = getIdentifierChain(node.qualifier);
                        let currentNamespace = moduleSymbol;
                        let current;
                        while (current = nameStack.shift()) {
                            const meaning = nameStack.length ? 1920 /* Namespace */ : targetMeaning;
                            const mergedResolvedSymbol = getMergedSymbol(resolveSymbol(currentNamespace));
                            const symbolFromVariable = node.isTypeOf || isInJSFile(node) && isExportEquals ? getPropertyOfType(getTypeOfSymbol(mergedResolvedSymbol), current.escapedText, 
                            /*skipObjectFunctionPropertyAugment*/
                            false, 
                            /*includeTypeOnlyMembers*/
                            true) : void 0;
                            const symbolFromModule = node.isTypeOf ? void 0 : getSymbol2(getExportsOfSymbol(mergedResolvedSymbol), current.escapedText, meaning);
                            const next = symbolFromModule != null ? symbolFromModule : symbolFromVariable;
                            if (!next) {
                                error(current, Diagnostics.Namespace_0_has_no_exported_member_1, getFullyQualifiedName(currentNamespace), declarationNameToString(current));
                                return links.resolvedType = errorType;
                            }
                            getNodeLinks(current).resolvedSymbol = next;
                            getNodeLinks(current.parent).resolvedSymbol = next;
                            currentNamespace = next;
                        }
                        links.resolvedType = resolveImportSymbolType(node, links, currentNamespace, targetMeaning);
                    }
                    else {
                        if (moduleSymbol.flags & targetMeaning) {
                            links.resolvedType = resolveImportSymbolType(node, links, moduleSymbol, targetMeaning);
                        }
                        else {
                            const errorMessage = targetMeaning === 111551 /* Value */ ? Diagnostics.Module_0_does_not_refer_to_a_value_but_is_used_as_a_value_here : Diagnostics.Module_0_does_not_refer_to_a_type_but_is_used_as_a_type_here_Did_you_mean_typeof_import_0;
                            error(node, errorMessage, node.argument.literal.text);
                            links.resolvedSymbol = unknownSymbol;
                            links.resolvedType = errorType;
                        }
                    }
                }
                return links.resolvedType;
            }