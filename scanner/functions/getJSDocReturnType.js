function getJSDocReturnType(node) {
            const returnTag = getJSDocReturnTag(node);
            if (returnTag && returnTag.typeExpression) {
                return returnTag.typeExpression.type;
            }
            const typeTag = getJSDocTypeTag(node);
            if (typeTag && typeTag.typeExpression) {
                const type = typeTag.typeExpression.type;
                if (isTypeLiteralNode(type)) {
                    const sig = find(type.members, isCallSignatureDeclaration);
                    return sig && sig.type;
                }
                if (isFunctionTypeNode(type) || isJSDocFunctionType(type)) {
                    return type.type;
                }
            }
        }