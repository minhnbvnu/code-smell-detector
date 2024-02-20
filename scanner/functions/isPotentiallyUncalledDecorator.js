function isPotentiallyUncalledDecorator(decorator, signatures) {
                return signatures.length && every(signatures, (signature) => signature.minArgumentCount === 0 && !signatureHasRestParameter(signature) && signature.parameters.length < getDecoratorArgumentCount(decorator, signature));
            }