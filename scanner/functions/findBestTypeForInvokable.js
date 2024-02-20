function findBestTypeForInvokable(source, unionTarget) {
                let signatureKind = 0 /* Call */;
                const hasSignatures = getSignaturesOfType(source, signatureKind).length > 0 || (signatureKind = 1 /* Construct */, getSignaturesOfType(source, signatureKind).length > 0);
                if (hasSignatures) {
                    return find(unionTarget.types, (t) => getSignaturesOfType(t, signatureKind).length > 0);
                }
            }