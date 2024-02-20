function transformPrivateIdentifierInInExpression(node) {
                const info = accessPrivateIdentifier2(node.left);
                if (info) {
                    const receiver = visitNode(node.right, visitor, isExpression);
                    return setOriginalNode(emitHelpers().createClassPrivateFieldInHelper(info.brandCheckIdentifier, receiver), node);
                }
                return visitEachChild(node, visitor, context);
            }