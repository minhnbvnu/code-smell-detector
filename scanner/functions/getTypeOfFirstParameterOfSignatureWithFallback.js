function getTypeOfFirstParameterOfSignatureWithFallback(signature, fallbackType) {
                return signature.parameters.length > 0 ? getTypeAtPosition(signature, 0) : fallbackType;
            }