function someSignature(signatures, f) {
                if (isArray(signatures)) {
                    return some(signatures, (signature) => someSignature(signature, f));
                }
                return signatures.compositeKind === 1048576 /* Union */ ? some(signatures.compositeSignatures, f) : f(signatures);
            }