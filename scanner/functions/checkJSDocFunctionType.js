function checkJSDocFunctionType(node) {
                addLazyDiagnostic(checkJSDocFunctionTypeImplicitAny);
                checkSignatureDeclaration(node);
                function checkJSDocFunctionTypeImplicitAny() {
                    if (!node.type && !isJSDocConstructSignature(node)) {
                        reportImplicitAny(node, anyType);
                    }
                }
            }