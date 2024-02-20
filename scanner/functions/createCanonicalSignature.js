function createCanonicalSignature(signature) {
                return getSignatureInstantiation(signature, map(signature.typeParameters, (tp) => tp.target && !getConstraintOfTypeParameter(tp.target) ? tp.target : tp), isInJSFile(signature.declaration));
            }