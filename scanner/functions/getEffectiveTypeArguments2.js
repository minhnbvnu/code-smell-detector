function getEffectiveTypeArguments2(node, typeParameters) {
                return fillMissingTypeArguments(map(node.typeArguments, getTypeFromTypeNode), typeParameters, getMinTypeArgumentCount(typeParameters), isInJSFile(node));
            }