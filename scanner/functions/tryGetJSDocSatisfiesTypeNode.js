function tryGetJSDocSatisfiesTypeNode(node) {
            const tag = getJSDocSatisfiesTag(node);
            return tag && tag.typeExpression && tag.typeExpression.type;
        }