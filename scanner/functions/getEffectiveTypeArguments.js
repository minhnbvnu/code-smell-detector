function getEffectiveTypeArguments(node) {
            var _a2;
            if (isInJSFile(node)) {
                if (isParenthesizedExpression(node.parent)) {
                    const jsDocType = (_a2 = getJSDocTypeTag(node.parent)) == null ? void 0 : _a2.typeExpression.type;
                    if (jsDocType && isTypeReferenceNode(jsDocType) && isIdentifier(jsDocType.typeName) && idText(jsDocType.typeName) === "Promise") {
                        return jsDocType.typeArguments;
                    }
                }
            }
            else {
                return node.typeArguments;
            }
        }