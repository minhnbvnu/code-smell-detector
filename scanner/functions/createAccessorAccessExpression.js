function createAccessorAccessExpression(fieldName, isStatic2, container) {
            const leftHead = isStatic2 ? container.name : factory.createThis();
            return isIdentifier(fieldName) ? factory.createPropertyAccessExpression(leftHead, fieldName) : factory.createElementAccessExpression(leftHead, factory.createStringLiteralFromNode(fieldName));
        }