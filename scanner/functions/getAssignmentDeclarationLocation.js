function getAssignmentDeclarationLocation(node) {
                const typeAlias = findAncestor(node, (node2) => !(isJSDocNode(node2) || node2.flags & 8388608 /* JSDoc */) ? "quit" : isJSDocTypeAlias(node2));
                if (typeAlias) {
                    return;
                }
                const host2 = getJSDocHost(node);
                if (host2 && isExpressionStatement(host2) && isPrototypePropertyAssignment(host2.expression)) {
                    const symbol = getSymbolOfDeclaration(host2.expression.left);
                    if (symbol) {
                        return getDeclarationOfJSPrototypeContainer(symbol);
                    }
                }
                if (host2 && isFunctionExpression(host2) && isPrototypePropertyAssignment(host2.parent) && isExpressionStatement(host2.parent.parent)) {
                    const symbol = getSymbolOfDeclaration(host2.parent.left);
                    if (symbol) {
                        return getDeclarationOfJSPrototypeContainer(symbol);
                    }
                }
                if (host2 && (isObjectLiteralMethod(host2) || isPropertyAssignment(host2)) && isBinaryExpression(host2.parent.parent) && getAssignmentDeclarationKind(host2.parent.parent) === 6 /* Prototype */) {
                    const symbol = getSymbolOfDeclaration(host2.parent.parent.left);
                    if (symbol) {
                        return getDeclarationOfJSPrototypeContainer(symbol);
                    }
                }
                const sig = getEffectiveJSDocHost(node);
                if (sig && isFunctionLike(sig)) {
                    const symbol = getSymbolOfDeclaration(sig);
                    return symbol && symbol.valueDeclaration;
                }
            }