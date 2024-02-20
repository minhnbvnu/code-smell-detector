function resolveTypeReferenceMembers(type) {
                const source = resolveDeclaredMembers(type.target);
                const typeParameters = concatenate(source.typeParameters, [source.thisType]);
                const typeArguments = getTypeArguments(type);
                const paddedTypeArguments = typeArguments.length === typeParameters.length ? typeArguments : concatenate(typeArguments, [type]);
                resolveObjectTypeMembers(type, source, typeParameters, paddedTypeArguments);
            }