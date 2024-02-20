function entityNameToString(name) {
            switch (name.kind) {
                case 108 /* ThisKeyword */:
                    return "this";
                case 80 /* PrivateIdentifier */:
                case 79 /* Identifier */:
                    return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
                case 163 /* QualifiedName */:
                    return entityNameToString(name.left) + "." + entityNameToString(name.right);
                case 208 /* PropertyAccessExpression */:
                    if (isIdentifier(name.name) || isPrivateIdentifier(name.name)) {
                        return entityNameToString(name.expression) + "." + entityNameToString(name.name);
                    }
                    else {
                        return Debug.assertNever(name.name);
                    }
                case 314 /* JSDocMemberName */:
                    return entityNameToString(name.left) + entityNameToString(name.right);
                default:
                    return Debug.assertNever(name);
            }
        }