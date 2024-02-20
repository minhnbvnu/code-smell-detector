function formatSymbol(symbol) {
                        return `{ name: ${unescapeLeadingUnderscores(symbol.escapedName)}; flags: ${formatSymbolFlags(symbol.flags)}; declarations: ${map(symbol.declarations, (node) => formatSyntaxKind(node.kind))} }`;
                    }