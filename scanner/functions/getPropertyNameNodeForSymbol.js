function getPropertyNameNodeForSymbol(symbol, context) {
                    const stringNamed = !!length(symbol.declarations) && every(symbol.declarations, isStringNamed);
                    const singleQuote = !!length(symbol.declarations) && every(symbol.declarations, isSingleQuotedStringNamed);
                    const fromNameType = getPropertyNameNodeForSymbolFromNameType(symbol, context, singleQuote, stringNamed);
                    if (fromNameType) {
                        return fromNameType;
                    }
                    const rawName = unescapeLeadingUnderscores(symbol.escapedName);
                    return createPropertyNameNodeForIdentifierOrLiteral(rawName, getEmitScriptTarget(compilerOptions), singleQuote, stringNamed);
                }