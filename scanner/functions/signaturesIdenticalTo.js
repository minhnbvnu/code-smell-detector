function signaturesIdenticalTo(source2, target2, kind) {
                    const sourceSignatures = getSignaturesOfType(source2, kind);
                    const targetSignatures = getSignaturesOfType(target2, kind);
                    if (sourceSignatures.length !== targetSignatures.length) {
                        return 0 /* False */;
                    }
                    let result2 = -1 /* True */;
                    for (let i = 0; i < sourceSignatures.length; i++) {
                        const related = compareSignaturesIdentical(sourceSignatures[i], targetSignatures[i], 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        false, isRelatedTo);
                        if (!related) {
                            return 0 /* False */;
                        }
                        result2 &= related;
                    }
                    return result2;
                }