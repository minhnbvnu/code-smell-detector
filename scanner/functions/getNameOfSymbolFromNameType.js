function getNameOfSymbolFromNameType(symbol, context) {
                const nameType = getSymbolLinks(symbol).nameType;
                if (nameType) {
                    if (nameType.flags & 384 /* StringOrNumberLiteral */) {
                        const name = "" + nameType.value;
                        if (!isIdentifierText(name, getEmitScriptTarget(compilerOptions)) && !isNumericLiteralName(name)) {
                            return `"${escapeString(name, 34 /* doubleQuote */)}"`;
                        }
                        if (isNumericLiteralName(name) && startsWith(name, "-")) {
                            return `[${name}]`;
                        }
                        return name;
                    }
                    if (nameType.flags & 8192 /* UniqueESSymbol */) {
                        return `[${getNameOfSymbolAsWritten(nameType.symbol, context)}]`;
                    }
                }
            }