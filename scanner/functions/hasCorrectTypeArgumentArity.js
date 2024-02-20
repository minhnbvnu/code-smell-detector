function hasCorrectTypeArgumentArity(signature, typeArguments) {
                const numTypeParameters = length(signature.typeParameters);
                const minTypeArgumentCount = getMinTypeArgumentCount(signature.typeParameters);
                return !some(typeArguments) || typeArguments.length >= minTypeArgumentCount && typeArguments.length <= numTypeParameters;
            }