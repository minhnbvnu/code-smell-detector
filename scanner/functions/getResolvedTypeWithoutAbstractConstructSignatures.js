function getResolvedTypeWithoutAbstractConstructSignatures(type) {
                if (type.constructSignatures.length === 0)
                    return type;
                if (type.objectTypeWithoutAbstractConstructSignatures)
                    return type.objectTypeWithoutAbstractConstructSignatures;
                const constructSignatures = filter(type.constructSignatures, (signature) => !(signature.flags & 4 /* Abstract */));
                if (type.constructSignatures === constructSignatures)
                    return type;
                const typeCopy = createAnonymousType(type.symbol, type.members, type.callSignatures, some(constructSignatures) ? constructSignatures : emptyArray, type.indexInfos);
                type.objectTypeWithoutAbstractConstructSignatures = typeCopy;
                typeCopy.objectTypeWithoutAbstractConstructSignatures = typeCopy;
                return typeCopy;
            }