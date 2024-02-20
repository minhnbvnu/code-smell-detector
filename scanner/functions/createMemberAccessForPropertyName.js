function createMemberAccessForPropertyName(factory2, target, memberName, location) {
            if (isComputedPropertyName(memberName)) {
                return setTextRange(factory2.createElementAccessExpression(target, memberName.expression), location);
            }
            else {
                const expression = setTextRange(isMemberName(memberName) ? factory2.createPropertyAccessExpression(target, memberName) : factory2.createElementAccessExpression(target, memberName), memberName);
                addEmitFlags(expression, 128 /* NoNestedSourceMaps */);
                return expression;
            }
        }