function isSymbolUsedInBinaryExpressionChain(node, testedSymbol) {
                while (isBinaryExpression(node) && node.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                    const isUsed = forEachChild(node.right, function visit(child) {
                        if (isIdentifier(child)) {
                            const symbol = getSymbolAtLocation(child);
                            if (symbol && symbol === testedSymbol) {
                                return true;
                            }
                        }
                        return forEachChild(child, visit);
                    });
                    if (isUsed) {
                        return true;
                    }
                    node = node.parent;
                }
                return false;
            }