function getDeclaredTypeOfEnum(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.declaredType) {
                    const memberTypeList = [];
                    if (symbol.declarations) {
                        for (const declaration of symbol.declarations) {
                            if (declaration.kind === 263 /* EnumDeclaration */) {
                                for (const member of declaration.members) {
                                    if (hasBindableName(member)) {
                                        const memberSymbol = getSymbolOfDeclaration(member);
                                        const value = getEnumMemberValue(member);
                                        const memberType = getFreshTypeOfLiteralType(value !== void 0 ? getEnumLiteralType(value, getSymbolId(symbol), memberSymbol) : createComputedEnumType(memberSymbol));
                                        getSymbolLinks(memberSymbol).declaredType = memberType;
                                        memberTypeList.push(getRegularTypeOfLiteralType(memberType));
                                    }
                                }
                            }
                        }
                    }
                    const enumType = memberTypeList.length ? getUnionType(memberTypeList, 1 /* Literal */, symbol, 
                    /*aliasTypeArguments*/
                    void 0) : createComputedEnumType(symbol);
                    if (enumType.flags & 1048576 /* Union */) {
                        enumType.flags |= 1024 /* EnumLiteral */;
                        enumType.symbol = symbol;
                    }
                    links.declaredType = enumType;
                }
                return links.declaredType;
            }