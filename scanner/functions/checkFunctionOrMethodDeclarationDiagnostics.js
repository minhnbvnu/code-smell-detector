function checkFunctionOrMethodDeclarationDiagnostics() {
                    if (!getEffectiveReturnTypeNode(node)) {
                        if (nodeIsMissing(body) && !isPrivateWithinAmbient(node)) {
                            reportImplicitAny(node, anyType);
                        }
                        if (functionFlags & 1 /* Generator */ && nodeIsPresent(body)) {
                            getReturnTypeOfSignature(getSignatureFromDeclaration(node));
                        }
                    }
                }