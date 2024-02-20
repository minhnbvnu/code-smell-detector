function cloneTypeReference(source) {
                const type = createTypeWithSymbol(source.flags, source.symbol);
                type.objectFlags = source.objectFlags;
                type.target = source.target;
                type.resolvedTypeArguments = source.resolvedTypeArguments;
                return type;
            }