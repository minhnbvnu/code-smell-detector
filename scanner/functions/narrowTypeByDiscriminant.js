function narrowTypeByDiscriminant(type, access, narrowType2) {
                    const propName = getAccessedPropertyName(access);
                    if (propName === void 0) {
                        return type;
                    }
                    const optionalChain = isOptionalChain(access);
                    const removeNullable = strictNullChecks && (optionalChain || isNonNullAccess(access)) && maybeTypeOfKind(type, 98304 /* Nullable */);
                    let propType = getTypeOfPropertyOfType(removeNullable ? getTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type, propName);
                    if (!propType) {
                        return type;
                    }
                    propType = removeNullable && optionalChain ? getOptionalType(propType) : propType;
                    const narrowedPropType = narrowType2(propType);
                    return filterType(type, (t) => {
                        const discriminantType = getTypeOfPropertyOrIndexSignature(t, propName);
                        return !(discriminantType.flags & 131072 /* Never */) && !(narrowedPropType.flags & 131072 /* Never */) && areTypesComparable(narrowedPropType, discriminantType);
                    });
                }