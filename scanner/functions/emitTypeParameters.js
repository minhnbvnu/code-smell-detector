function emitTypeParameters(parentNode, typeParameters) {
                if (isFunctionLike(parentNode) && parentNode.typeArguments) {
                    return emitTypeArguments(parentNode, parentNode.typeArguments);
                }
                emitList(parentNode, typeParameters, 53776 /* TypeParameters */);
            }