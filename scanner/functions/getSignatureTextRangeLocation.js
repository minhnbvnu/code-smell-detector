function getSignatureTextRangeLocation(signature) {
                        if (signature.declaration && signature.declaration.parent) {
                            if (isBinaryExpression(signature.declaration.parent) && getAssignmentDeclarationKind(signature.declaration.parent) === 5 /* Property */) {
                                return signature.declaration.parent;
                            }
                            if (isVariableDeclaration(signature.declaration.parent) && signature.declaration.parent.parent) {
                                return signature.declaration.parent.parent;
                            }
                        }
                        return signature.declaration;
                    }