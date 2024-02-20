function createPrivateIdentifierAccess(info, receiver) {
                return createPrivateIdentifierAccessHelper(info, visitNode(receiver, visitor, isExpression));
            }