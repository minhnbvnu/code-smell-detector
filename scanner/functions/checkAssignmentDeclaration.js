function checkAssignmentDeclaration(kind, rightType2) {
                    if (kind === 2 /* ModuleExports */) {
                        for (const prop of getPropertiesOfObjectType(rightType2)) {
                            const propType = getTypeOfSymbol(prop);
                            if (propType.symbol && propType.symbol.flags & 32 /* Class */) {
                                const name = prop.escapedName;
                                const symbol = resolveName(prop.valueDeclaration, name, 788968 /* Type */, void 0, name, 
                                /*isUse*/
                                false);
                                if ((symbol == null ? void 0 : symbol.declarations) && symbol.declarations.some(isJSDocTypedefTag)) {
                                    addDuplicateDeclarationErrorsForSymbols(symbol, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), prop);
                                    addDuplicateDeclarationErrorsForSymbols(prop, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), symbol);
                                }
                            }
                        }
                    }
                }