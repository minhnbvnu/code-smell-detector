function typeNodeIsEquivalentToType(typeNode, annotatedDeclaration, type) {
                    const typeFromTypeNode = getTypeFromTypeNode(typeNode);
                    if (typeFromTypeNode === type) {
                        return true;
                    }
                    if (isParameter(annotatedDeclaration) && annotatedDeclaration.questionToken) {
                        return getTypeWithFacts(type, 524288 /* NEUndefined */) === typeFromTypeNode;
                    }
                    return false;
                }