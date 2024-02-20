function isOptionalJSDocPropertyLikeTag(node) {
            if (!isJSDocPropertyLikeTag(node)) {
                return false;
            }
            const { isBracketed, typeExpression } = node;
            return isBracketed || !!typeExpression && typeExpression.type.kind === 319 /* JSDocOptionalType */;
        }