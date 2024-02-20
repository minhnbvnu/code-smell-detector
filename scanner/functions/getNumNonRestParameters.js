function getNumNonRestParameters(signature) {
                const numParams = signature.parameters.length;
                return signatureHasRestParameter(signature) ? numParams - 1 : numParams;
            }