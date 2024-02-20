function findMatchingSignature(signatureList, signature, partialMatch, ignoreThisTypes, ignoreReturnTypes) {
                for (const s of signatureList) {
                    if (compareSignaturesIdentical(s, signature, partialMatch, ignoreThisTypes, ignoreReturnTypes, partialMatch ? compareTypesSubtypeOf : compareTypesIdentical)) {
                        return s;
                    }
                }
            }