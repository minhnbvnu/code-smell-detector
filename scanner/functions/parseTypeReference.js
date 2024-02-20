function parseTypeReference() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTypeReferenceNode(parseEntityNameOfTypeReference(), parseTypeArgumentsOfTypeReference()), pos);
                    }