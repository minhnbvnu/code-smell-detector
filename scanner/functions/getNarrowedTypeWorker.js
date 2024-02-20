function getNarrowedTypeWorker(type, candidate, assumeTrue, checkDerived) {
                    if (!assumeTrue) {
                        if (checkDerived) {
                            return filterType(type, (t) => !isTypeDerivedFrom(t, candidate));
                        }
                        const trueType2 = getNarrowedType(type, candidate, 
                        /*assumeTrue*/
                        true, 
                        /*checkDerived*/
                        false);
                        return filterType(type, (t) => !isTypeSubsetOf(t, trueType2));
                    }
                    if (type.flags & 3 /* AnyOrUnknown */) {
                        return candidate;
                    }
                    const isRelated = checkDerived ? isTypeDerivedFrom : isTypeSubtypeOf;
                    const keyPropertyName = type.flags & 1048576 /* Union */ ? getKeyPropertyName(type) : void 0;
                    const narrowedType = mapType(candidate, (c) => {
                        const discriminant = keyPropertyName && getTypeOfPropertyOfType(c, keyPropertyName);
                        const matching = discriminant && getConstituentTypeForKeyType(type, discriminant);
                        const directlyRelated = mapType(matching || type, checkDerived ? (t) => isTypeDerivedFrom(t, c) ? t : isTypeDerivedFrom(c, t) ? c : neverType : (t) => isTypeStrictSubtypeOf(t, c) ? t : isTypeStrictSubtypeOf(c, t) ? c : isTypeSubtypeOf(t, c) ? t : isTypeSubtypeOf(c, t) ? c : neverType);
                        return directlyRelated.flags & 131072 /* Never */ ? mapType(type, (t) => maybeTypeOfKind(t, 465829888 /* Instantiable */) && isRelated(c, getBaseConstraintOfType(t) || unknownType) ? getIntersectionType([t, c]) : neverType) : directlyRelated;
                    });
                    return !(narrowedType.flags & 131072 /* Never */) ? narrowedType : isTypeSubtypeOf(candidate, type) ? candidate : isTypeAssignableTo(type, candidate) ? type : isTypeAssignableTo(candidate, type) ? candidate : getIntersectionType([type, candidate]);
                }