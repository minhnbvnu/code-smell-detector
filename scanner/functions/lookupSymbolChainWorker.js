function lookupSymbolChainWorker(symbol, context, meaning, yieldModuleSymbol) {
                    let chain;
                    const isTypeParameter = symbol.flags & 262144 /* TypeParameter */;
                    if (!isTypeParameter && (context.enclosingDeclaration || context.flags & 64 /* UseFullyQualifiedType */) && !(context.flags & 134217728 /* DoNotIncludeSymbolChain */)) {
                        chain = Debug.checkDefined(getSymbolChain(symbol, meaning, 
                        /*endOfChain*/
                        true));
                        Debug.assert(chain && chain.length > 0);
                    }
                    else {
                        chain = [symbol];
                    }
                    return chain;
                    function getSymbolChain(symbol2, meaning2, endOfChain) {
                        let accessibleSymbolChain = getAccessibleSymbolChain(symbol2, context.enclosingDeclaration, meaning2, !!(context.flags & 128 /* UseOnlyExternalAliasing */));
                        let parentSpecifiers;
                        if (!accessibleSymbolChain || needsQualification(accessibleSymbolChain[0], context.enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning2 : getQualifiedLeftMeaning(meaning2))) {
                            const parents = getContainersOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol2, context.enclosingDeclaration, meaning2);
                            if (length(parents)) {
                                parentSpecifiers = parents.map((symbol3) => some(symbol3.declarations, hasNonGlobalAugmentationExternalModuleSymbol) ? getSpecifierForModuleSymbol(symbol3, context) : void 0);
                                const indices = parents.map((_, i) => i);
                                indices.sort(sortByBestName);
                                const sortedParents = indices.map((i) => parents[i]);
                                for (const parent2 of sortedParents) {
                                    const parentChain = getSymbolChain(parent2, getQualifiedLeftMeaning(meaning2), 
                                    /*endOfChain*/
                                    false);
                                    if (parentChain) {
                                        if (parent2.exports && parent2.exports.get("export=" /* ExportEquals */) && getSymbolIfSameReference(parent2.exports.get("export=" /* ExportEquals */), symbol2)) {
                                            accessibleSymbolChain = parentChain;
                                            break;
                                        }
                                        accessibleSymbolChain = parentChain.concat(accessibleSymbolChain || [getAliasForSymbolInContainer(parent2, symbol2) || symbol2]);
                                        break;
                                    }
                                }
                            }
                        }
                        if (accessibleSymbolChain) {
                            return accessibleSymbolChain;
                        }
                        if (
                        // If this is the last part of outputting the symbol, always output. The cases apply only to parent symbols.
                        endOfChain || // If a parent symbol is an anonymous type, don't write it.
                            !(symbol2.flags & (2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */))) {
                            if (!endOfChain && !yieldModuleSymbol && !!forEach(symbol2.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                                return;
                            }
                            return [symbol2];
                        }
                        function sortByBestName(a, b) {
                            const specifierA = parentSpecifiers[a];
                            const specifierB = parentSpecifiers[b];
                            if (specifierA && specifierB) {
                                const isBRelative = pathIsRelative(specifierB);
                                if (pathIsRelative(specifierA) === isBRelative) {
                                    return countPathComponents(specifierA) - countPathComponents(specifierB);
                                }
                                if (isBRelative) {
                                    return -1;
                                }
                                return 1;
                            }
                            return 0;
                        }
                    }
                }