function findMatchingSignatures(signatureLists, signature, listIndex) {
                if (signature.typeParameters) {
                    if (listIndex > 0) {
                        return void 0;
                    }
                    for (let i = 1; i < signatureLists.length; i++) {
                        if (!findMatchingSignature(signatureLists[i], signature, 
                        /*partialMatch*/
                        false, 
                        /*ignoreThisTypes*/
                        false, 
                        /*ignoreReturnTypes*/
                        false)) {
                            return void 0;
                        }
                    }
                    return [signature];
                }
                let result;
                for (let i = 0; i < signatureLists.length; i++) {
                    const match = i === listIndex ? signature : findMatchingSignature(signatureLists[i], signature, 
                    /*partialMatch*/
                    true, 
                    /*ignoreThisTypes*/
                    false, 
                    /*ignoreReturnTypes*/
                    true);
                    if (!match) {
                        return void 0;
                    }
                    result = appendIfUnique(result, match);
                }
                return result;
            }