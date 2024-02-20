function getTypeOfDottedName(node, diagnostic) {
                if (!(node.flags & 33554432 /* InWithStatement */)) {
                    switch (node.kind) {
                        case 79 /* Identifier */:
                            const symbol = getExportSymbolOfValueSymbolIfExported(getResolvedSymbol(node));
                            return getExplicitTypeOfSymbol(symbol, diagnostic);
                        case 108 /* ThisKeyword */:
                            return getExplicitThisType(node);
                        case 106 /* SuperKeyword */:
                            return checkSuperExpression(node);
                        case 208 /* PropertyAccessExpression */: {
                            const type = getTypeOfDottedName(node.expression, diagnostic);
                            if (type) {
                                const name = node.name;
                                let prop;
                                if (isPrivateIdentifier(name)) {
                                    if (!type.symbol) {
                                        return void 0;
                                    }
                                    prop = getPropertyOfType(type, getSymbolNameForPrivateIdentifier(type.symbol, name.escapedText));
                                }
                                else {
                                    prop = getPropertyOfType(type, name.escapedText);
                                }
                                return prop && getExplicitTypeOfSymbol(prop, diagnostic);
                            }
                            return void 0;
                        }
                        case 214 /* ParenthesizedExpression */:
                            return getTypeOfDottedName(node.expression, diagnostic);
                    }
                }
            }