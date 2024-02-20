function appendSignatures(signatures, newSignatures) {
                for (const sig of newSignatures) {
                    if (!signatures || every(signatures, (s) => !compareSignaturesIdentical(s, sig, 
                    /*partialMatch*/
                    false, 
                    /*ignoreThisTypes*/
                    false, 
                    /*ignoreReturnTypes*/
                    false, compareTypesIdentical))) {
                        signatures = append(signatures, sig);
                    }
                }
                return signatures;
            }