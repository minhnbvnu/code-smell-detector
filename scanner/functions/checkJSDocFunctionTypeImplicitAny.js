function checkJSDocFunctionTypeImplicitAny() {
                    if (!node.type && !isJSDocConstructSignature(node)) {
                        reportImplicitAny(node, anyType);
                    }
                }