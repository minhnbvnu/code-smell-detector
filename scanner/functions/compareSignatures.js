function compareSignatures(a, b, isTypeParameter) {
                if (!signaturesCanBeUnified(a, b, isTypeParameter)) {
                    return undefined;
                }
                return a.params.length === b.params.length
                    ? signaturesDifferBySingleParameter(a.params, b.params)
                    : signaturesDifferByOptionalOrRestParameter(a, b);
            }