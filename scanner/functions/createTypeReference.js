function createTypeReference(target, typeArguments) {
                const id = getTypeListId(typeArguments);
                let type = target.instantiations.get(id);
                if (!type) {
                    type = createObjectType(4 /* Reference */, target.symbol);
                    target.instantiations.set(id, type);
                    type.objectFlags |= typeArguments ? getPropagatingFlagsOfTypes(typeArguments) : 0;
                    type.target = target;
                    type.resolvedTypeArguments = typeArguments;
                }
                return type;
            }