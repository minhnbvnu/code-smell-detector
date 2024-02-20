function isSymbolUsedInConditionBody(expr, body, testedNode, testedSymbol) {
                return !!forEachChild(body, function check(childNode) {
                    if (isIdentifier(childNode)) {
                        const childSymbol = getSymbolAtLocation(childNode);
                        if (childSymbol && childSymbol === testedSymbol) {
                            if (isIdentifier(expr) || isIdentifier(testedNode) && isBinaryExpression(testedNode.parent)) {
                                return true;
                            }
                            let testedExpression = testedNode.parent;
                            let childExpression = childNode.parent;
                            while (testedExpression && childExpression) {
                                if (isIdentifier(testedExpression) && isIdentifier(childExpression) || testedExpression.kind === 108 /* ThisKeyword */ && childExpression.kind === 108 /* ThisKeyword */) {
                                    return getSymbolAtLocation(testedExpression) === getSymbolAtLocation(childExpression);
                                }
                                else if (isPropertyAccessExpression(testedExpression) && isPropertyAccessExpression(childExpression)) {
                                    if (getSymbolAtLocation(testedExpression.name) !== getSymbolAtLocation(childExpression.name)) {
                                        return false;
                                    }
                                    childExpression = childExpression.expression;
                                    testedExpression = testedExpression.expression;
                                }
                                else if (isCallExpression(testedExpression) && isCallExpression(childExpression)) {
                                    childExpression = childExpression.expression;
                                    testedExpression = testedExpression.expression;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                    }
                    return forEachChild(childNode, check);
                });
            }