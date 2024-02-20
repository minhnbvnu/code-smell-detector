function getInstantiatedConstructorsForTypeArguments(type, typeArgumentNodes, location) {
                const signatures = getConstructorsForTypeArguments(type, typeArgumentNodes, location);
                const typeArguments = map(typeArgumentNodes, getTypeFromTypeNode);
                return sameMap(signatures, (sig) => some(sig.typeParameters) ? getSignatureInstantiation(sig, typeArguments, isInJSFile(location)) : sig);
            }