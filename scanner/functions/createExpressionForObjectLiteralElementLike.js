function createExpressionForObjectLiteralElementLike(factory2, node, property, receiver) {
            if (property.name && isPrivateIdentifier(property.name)) {
                Debug.failBadSyntaxKind(property.name, "Private identifiers are not allowed in object literals.");
            }
            switch (property.kind) {
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return createExpressionForAccessorDeclaration(factory2, node.properties, property, receiver, !!node.multiLine);
                case 299 /* PropertyAssignment */:
                    return createExpressionForPropertyAssignment(factory2, property, receiver);
                case 300 /* ShorthandPropertyAssignment */:
                    return createExpressionForShorthandPropertyAssignment(factory2, property, receiver);
                case 171 /* MethodDeclaration */:
                    return createExpressionForMethodDeclaration(factory2, property, receiver);
            }
        }