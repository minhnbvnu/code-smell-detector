function getConstructorsForTypeArguments(type, typeArgumentNodes, location) {
                const typeArgCount = length(typeArgumentNodes);
                const isJavascript = isInJSFile(location);
                return filter(getSignaturesOfType(type, 1 /* Construct */), (sig) => (isJavascript || typeArgCount >= getMinTypeArgumentCount(sig.typeParameters)) && typeArgCount <= length(sig.typeParameters));
            }