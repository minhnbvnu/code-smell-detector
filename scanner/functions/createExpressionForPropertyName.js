function createExpressionForPropertyName(factory2, memberName) {
            if (isIdentifier(memberName)) {
                return factory2.createStringLiteralFromNode(memberName);
            }
            else if (isComputedPropertyName(memberName)) {
                return setParent(setTextRange(factory2.cloneNode(memberName.expression), memberName.expression), memberName.expression.parent);
            }
            else {
                return setParent(setTextRange(factory2.cloneNode(memberName), memberName), memberName.parent);
            }
        }