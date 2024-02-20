function instantiateSignatures(signatures, mapper) {
                return instantiateList(signatures, mapper, instantiateSignature);
            }