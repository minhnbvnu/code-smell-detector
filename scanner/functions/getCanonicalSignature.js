function getCanonicalSignature(signature) {
                return signature.typeParameters ? signature.canonicalSignatureCache || (signature.canonicalSignatureCache = createCanonicalSignature(signature)) : signature;
            }