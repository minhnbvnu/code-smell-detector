function getWidenedTypeWithContext(type, context) {
                if (getObjectFlags(type) & 196608 /* RequiresWidening */) {
                    if (context === void 0 && type.widened) {
                        return type.widened;
                    }
                    let result;
                    if (type.flags & (1 /* Any */ | 98304 /* Nullable */)) {
                        result = anyType;
                    }
                    else if (isObjectLiteralType2(type)) {
                        result = getWidenedTypeOfObjectLiteral(type, context);
                    }
                    else if (type.flags & 1048576 /* Union */) {
                        const unionContext = context || createWideningContext(
                        /*parent*/
                        void 0, 
                        /*propertyName*/
                        void 0, type.types);
                        const widenedTypes = sameMap(type.types, (t) => t.flags & 98304 /* Nullable */ ? t : getWidenedTypeWithContext(t, unionContext));
                        result = getUnionType(widenedTypes, some(widenedTypes, isEmptyObjectType) ? 2 /* Subtype */ : 1 /* Literal */);
                    }
                    else if (type.flags & 2097152 /* Intersection */) {
                        result = getIntersectionType(sameMap(type.types, getWidenedType));
                    }
                    else if (isArrayOrTupleType(type)) {
                        result = createTypeReference(type.target, sameMap(getTypeArguments(type), getWidenedType));
                    }
                    if (result && context === void 0) {
                        type.widened = result;
                    }
                    return result || type;
                }
                return type;
            }