function symbolToEntityNameNode(symbol) {
                    const identifier = factory.createIdentifier(unescapeLeadingUnderscores(symbol.escapedName));
                    return symbol.parent ? factory.createQualifiedName(symbolToEntityNameNode(symbol.parent), identifier) : identifier;
                }