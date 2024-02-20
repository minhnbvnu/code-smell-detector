function resolveIntersectionTypeMembers(type) {
                let callSignatures;
                let constructSignatures;
                let indexInfos;
                const types = type.types;
                const mixinFlags = findMixins(types);
                const mixinCount = countWhere(mixinFlags, (b) => b);
                for (let i = 0; i < types.length; i++) {
                    const t = type.types[i];
                    if (!mixinFlags[i]) {
                        let signatures = getSignaturesOfType(t, 1 /* Construct */);
                        if (signatures.length && mixinCount > 0) {
                            signatures = map(signatures, (s) => {
                                const clone2 = cloneSignature(s);
                                clone2.resolvedReturnType = includeMixinType(getReturnTypeOfSignature(s), types, mixinFlags, i);
                                return clone2;
                            });
                        }
                        constructSignatures = appendSignatures(constructSignatures, signatures);
                    }
                    callSignatures = appendSignatures(callSignatures, getSignaturesOfType(t, 0 /* Call */));
                    indexInfos = reduceLeft(getIndexInfosOfType(t), (infos, newInfo) => appendIndexInfo(infos, newInfo, 
                    /*union*/
                    false), indexInfos);
                }
                setStructuredTypeMembers(type, emptySymbols, callSignatures || emptyArray, constructSignatures || emptyArray, indexInfos || emptyArray);
            }