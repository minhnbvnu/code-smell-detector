function getSymbolForPrivateIdentifierExpression(privId) {
                if (!isExpressionNode(privId)) {
                    return void 0;
                }
                const links = getNodeLinks(privId);
                if (links.resolvedSymbol === void 0) {
                    links.resolvedSymbol = lookupSymbolForPrivateIdentifierDeclaration(privId.escapedText, privId);
                }
                return links.resolvedSymbol;
            }