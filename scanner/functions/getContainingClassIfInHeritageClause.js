function getContainingClassIfInHeritageClause(node) {
                        return isIdentifier(node) || isPropertyAccessExpression(node) ? getContainingClassIfInHeritageClause(node.parent) : isExpressionWithTypeArguments(node) ? tryCast(node.parent.parent, isClassLike) : void 0;
                    }