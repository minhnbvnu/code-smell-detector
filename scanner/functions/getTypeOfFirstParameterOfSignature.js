function getTypeOfFirstParameterOfSignature(signature) {
                return getTypeOfFirstParameterOfSignatureWithFallback(signature, neverType);
            }