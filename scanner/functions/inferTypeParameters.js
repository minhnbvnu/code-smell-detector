function inferTypeParameters(genericType, usageType, typeParameter) {
                if (genericType === typeParameter) {
                    return [usageType];
                }
                else if (genericType.flags & 3145728 /* UnionOrIntersection */) {
                    return flatMap(genericType.types, (t) => inferTypeParameters(t, usageType, typeParameter));
                }
                else if (getObjectFlags(genericType) & 4 /* Reference */ && getObjectFlags(usageType) & 4 /* Reference */) {
                    const genericArgs = checker.getTypeArguments(genericType);
                    const usageArgs = checker.getTypeArguments(usageType);
                    const types = [];
                    if (genericArgs && usageArgs) {
                        for (let i = 0; i < genericArgs.length; i++) {
                            if (usageArgs[i]) {
                                types.push(...inferTypeParameters(genericArgs[i], usageArgs[i], typeParameter));
                            }
                        }
                    }
                    return types;
                }
                const genericSigs = checker.getSignaturesOfType(genericType, 0 /* Call */);
                const usageSigs = checker.getSignaturesOfType(usageType, 0 /* Call */);
                if (genericSigs.length === 1 && usageSigs.length === 1) {
                    return inferFromSignatures(genericSigs[0], usageSigs[0], typeParameter);
                }
                return [];
            }