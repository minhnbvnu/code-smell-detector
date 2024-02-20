function getInstantiatedType(type) {
                    let hasSignatures = false;
                    let hasApplicableSignature = false;
                    const result2 = getInstantiatedTypePart(type);
                    hasSomeApplicableSignature || (hasSomeApplicableSignature = hasApplicableSignature);
                    if (hasSignatures && !hasApplicableSignature) {
                        nonApplicableType != null ? nonApplicableType : nonApplicableType = type;
                    }
                    return result2;
                    function getInstantiatedTypePart(type2) {
                        if (type2.flags & 524288 /* Object */) {
                            const resolved = resolveStructuredTypeMembers(type2);
                            const callSignatures = getInstantiatedSignatures(resolved.callSignatures);
                            const constructSignatures = getInstantiatedSignatures(resolved.constructSignatures);
                            hasSignatures || (hasSignatures = resolved.callSignatures.length !== 0 || resolved.constructSignatures.length !== 0);
                            hasApplicableSignature || (hasApplicableSignature = callSignatures.length !== 0 || constructSignatures.length !== 0);
                            if (callSignatures !== resolved.callSignatures || constructSignatures !== resolved.constructSignatures) {
                                const result3 = createAnonymousType(void 0, resolved.members, callSignatures, constructSignatures, resolved.indexInfos);
                                result3.objectFlags |= 8388608 /* InstantiationExpressionType */;
                                result3.node = node;
                                return result3;
                            }
                        }
                        else if (type2.flags & 58982400 /* InstantiableNonPrimitive */) {
                            const constraint = getBaseConstraintOfType(type2);
                            if (constraint) {
                                const instantiated = getInstantiatedTypePart(constraint);
                                if (instantiated !== constraint) {
                                    return instantiated;
                                }
                            }
                        }
                        else if (type2.flags & 1048576 /* Union */) {
                            return mapType(type2, getInstantiatedType);
                        }
                        else if (type2.flags & 2097152 /* Intersection */) {
                            return getIntersectionType(sameMap(type2.types, getInstantiatedTypePart));
                        }
                        return type2;
                    }
                }