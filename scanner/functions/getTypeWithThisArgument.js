function getTypeWithThisArgument(type, thisArgument, needApparentType) {
                if (getObjectFlags(type) & 4 /* Reference */) {
                    const target = type.target;
                    const typeArguments = getTypeArguments(type);
                    if (length(target.typeParameters) === length(typeArguments)) {
                        const ref = createTypeReference(target, concatenate(typeArguments, [thisArgument || target.thisType]));
                        return needApparentType ? getApparentType(ref) : ref;
                    }
                }
                else if (type.flags & 2097152 /* Intersection */) {
                    const types = sameMap(type.types, (t) => getTypeWithThisArgument(t, thisArgument, needApparentType));
                    return types !== type.types ? getIntersectionType(types) : type;
                }
                return needApparentType ? getApparentType(type) : type;
            }