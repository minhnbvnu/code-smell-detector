function getEffectiveReturnTypeNode(node) {
            return isJSDocSignature(node) ? node.type && node.type.typeExpression && node.type.typeExpression.type : node.type || (isInJSFile(node) ? getJSDocReturnType(node) : void 0);
        }