function isSyntacticOwner(startingToken, node, sourceFile) {
            if (!isCallOrNewExpression(node))
                return false;
            const invocationChildren = node.getChildren(sourceFile);
            switch (startingToken.kind) {
                case 20 /* OpenParenToken */:
                    return contains(invocationChildren, startingToken);
                case 27 /* CommaToken */: {
                    const containingList = findContainingList(startingToken);
                    return !!containingList && contains(invocationChildren, containingList);
                }
                case 29 /* LessThanToken */:
                    return containsPrecedingToken(startingToken, sourceFile, node.expression);
                default:
                    return false;
            }
        }