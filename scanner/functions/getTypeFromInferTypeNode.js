function getTypeFromInferTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    links.resolvedType = getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(node.typeParameter));
                }
                return links.resolvedType;
            }