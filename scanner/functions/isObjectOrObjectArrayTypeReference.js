function isObjectOrObjectArrayTypeReference(node) {
                                switch (node.kind) {
                                    case 149 /* ObjectKeyword */:
                                        return true;
                                    case 185 /* ArrayType */:
                                        return isObjectOrObjectArrayTypeReference(node.elementType);
                                    default:
                                        return isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "Object" && !node.typeArguments;
                                }
                            }