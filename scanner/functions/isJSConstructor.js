function isJSConstructor(node) {
                var _a2;
                if (!node || !isInJSFile(node)) {
                    return false;
                }
                const func = isFunctionDeclaration(node) || isFunctionExpression(node) ? node : (isVariableDeclaration(node) || isPropertyAssignment(node)) && node.initializer && isFunctionExpression(node.initializer) ? node.initializer : void 0;
                if (func) {
                    if (getJSDocClassTag(node))
                        return true;
                    if (isPropertyAssignment(walkUpParenthesizedExpressions(func.parent)))
                        return false;
                    const symbol = getSymbolOfDeclaration(func);
                    return !!((_a2 = symbol == null ? void 0 : symbol.members) == null ? void 0 : _a2.size);
                }
                return false;
            }