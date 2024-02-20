function getContextualSignatureForFunctionLikeDeclaration(node) {
                return isFunctionExpressionOrArrowFunction(node) || isObjectLiteralMethod(node) ? getContextualSignature(node) : void 0;
            }