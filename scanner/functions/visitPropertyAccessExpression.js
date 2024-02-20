function visitPropertyAccessExpression(node) {
                if (isSuperProperty(node) && isIdentifier(node.name) && classThis && classSuper) {
                    const propertyName = factory2.createStringLiteralFromNode(node.name);
                    const superProperty = factory2.createReflectGetCall(classSuper, propertyName, classThis);
                    setOriginalNode(superProperty, node.expression);
                    setTextRange(superProperty, node.expression);
                    return superProperty;
                }
                return visitEachChild(node, visitor, context);
            }