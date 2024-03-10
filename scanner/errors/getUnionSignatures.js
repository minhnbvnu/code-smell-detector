function getUnionSignatures(signatureLists) {
                let result;
                let indexWithLengthOverOne;
                for (let i = 0; i < signatureLists.length; i++) {
                    if (signatureLists[i].length === 0)
                        return emptyArray;
                    if (signatureLists[i].length > 1) {
                        indexWithLengthOverOne = indexWithLengthOverOne === void 0 ? i : -1;
                    }
                    for (const signature of signatureLists[i]) {
                        if (!result || !findMatchingSignature(result, signature, 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        true)) {
                            const unionSignatures = findMatchingSignatures(signatureLists, signature, i);
                            if (unionSignatures) {
                                let s = signature;
                                if (unionSignatures.length > 1) {
                                    let thisParameter = signature.thisParameter;
                                    const firstThisParameterOfUnionSignatures = forEach(unionSignatures, (sig) => sig.thisParameter);
                                    if (firstThisParameterOfUnionSignatures) {
                                        const thisType = getIntersectionType(mapDefined(unionSignatures, (sig) => sig.thisParameter && getTypeOfSymbol(sig.thisParameter)));
                                        thisParameter = createSymbolWithType(firstThisParameterOfUnionSignatures, thisType);
                                    }
                                    s = createUnionSignature(signature, unionSignatures);
                                    s.thisParameter = thisParameter;
                                }
                                (result || (result = [])).push(s);
                            }
                        }
                    }
                }
                if (!length(result) && indexWithLengthOverOne !== -1) {
                    const masterList = signatureLists[indexWithLengthOverOne !== void 0 ? indexWithLengthOverOne : 0];
                    let results = masterList.slice();
                    for (const signatures of signatureLists) {
                        if (signatures !== masterList) {
                            const signature = signatures[0];
                            Debug.assert(!!signature, "getUnionSignatures bails early on empty signature lists and should not have empty lists on second pass");
                            results = !!signature.typeParameters && some(results, (s) => !!s.typeParameters && !compareTypeParametersIdentical(signature.typeParameters, s.typeParameters)) ? void 0 : map(results, (sig) => combineSignaturesOfUnionMembers(sig, signature));
                            if (!results) {
                                break;
                            }
                        }
                    }
                    result = results;
                }
                return result || emptyArray;
            }