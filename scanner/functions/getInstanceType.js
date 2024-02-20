function getInstanceType(constructorType) {
                    const prototypePropertyType = getTypeOfPropertyOfType(constructorType, "prototype");
                    if (prototypePropertyType && !isTypeAny(prototypePropertyType)) {
                        return prototypePropertyType;
                    }
                    const constructSignatures = getSignaturesOfType(constructorType, 1 /* Construct */);
                    if (constructSignatures.length) {
                        return getUnionType(map(constructSignatures, (signature) => getReturnTypeOfSignature(getErasedSignature(signature))));
                    }
                    return emptyObjectType;
                }