function getContextualReturnType(functionDecl, contextFlags) {
                const returnType = getReturnTypeFromAnnotation(functionDecl);
                if (returnType) {
                    return returnType;
                }
                const signature = getContextualSignatureForFunctionLikeDeclaration(functionDecl);
                if (signature && !isResolvingReturnTypeOfSignature(signature)) {
                    return getReturnTypeOfSignature(signature);
                }
                const iife = getImmediatelyInvokedFunctionExpression(functionDecl);
                if (iife) {
                    return getContextualType2(iife, contextFlags);
                }
                return void 0;
            }