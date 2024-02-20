function lateBindMember(parent2, earlySymbols, lateSymbols, decl) {
                Debug.assert(!!decl.symbol, "The member is expected to have a symbol.");
                const links = getNodeLinks(decl);
                if (!links.resolvedSymbol) {
                    links.resolvedSymbol = decl.symbol;
                    const declName = isBinaryExpression(decl) ? decl.left : decl.name;
                    const type = isElementAccessExpression(declName) ? checkExpressionCached(declName.argumentExpression) : checkComputedPropertyName(declName);
                    if (isTypeUsableAsPropertyName(type)) {
                        const memberName = getPropertyNameFromType(type);
                        const symbolFlags = decl.symbol.flags;
                        let lateSymbol = lateSymbols.get(memberName);
                        if (!lateSymbol)
                            lateSymbols.set(memberName, lateSymbol = createSymbol(0 /* None */, memberName, 4096 /* Late */));
                        const earlySymbol = earlySymbols && earlySymbols.get(memberName);
                        if (lateSymbol.flags & getExcludedSymbolFlags(symbolFlags) || earlySymbol) {
                            const declarations = earlySymbol ? concatenate(earlySymbol.declarations, lateSymbol.declarations) : lateSymbol.declarations;
                            const name = !(type.flags & 8192 /* UniqueESSymbol */) && unescapeLeadingUnderscores(memberName) || declarationNameToString(declName);
                            forEach(declarations, (declaration) => error(getNameOfDeclaration(declaration) || declaration, Diagnostics.Property_0_was_also_declared_here, name));
                            error(declName || decl, Diagnostics.Duplicate_property_0, name);
                            lateSymbol = createSymbol(0 /* None */, memberName, 4096 /* Late */);
                        }
                        lateSymbol.links.nameType = type;
                        addDeclarationToLateBoundSymbol(lateSymbol, decl, symbolFlags);
                        if (lateSymbol.parent) {
                            Debug.assert(lateSymbol.parent === parent2, "Existing symbol parent should match new one");
                        }
                        else {
                            lateSymbol.parent = parent2;
                        }
                        return links.resolvedSymbol = lateSymbol;
                    }
                }
                return links.resolvedSymbol;
            }