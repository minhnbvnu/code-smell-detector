function getNormalizedType(type, writing) {
                while (true) {
                    const t = isFreshLiteralType(type) ? type.regularType : getObjectFlags(type) & 4 /* Reference */ ? type.node ? createTypeReference(type.target, getTypeArguments(type)) : getSingleBaseForNonAugmentingSubtype(type) || type : type.flags & 3145728 /* UnionOrIntersection */ ? getNormalizedUnionOrIntersectionType(type, writing) : type.flags & 33554432 /* Substitution */ ? writing ? type.baseType : getSubstitutionIntersection(type) : type.flags & 25165824 /* Simplifiable */ ? getSimplifiedType(type, writing) : type;
                    if (t === type)
                        return t;
                    type = t;
                }
            }