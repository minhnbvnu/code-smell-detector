function getLastCallSignature(type, checker) {
            const callSignatures = checker.getSignaturesOfType(type, 0 /* Call */);
            return lastOrUndefined(callSignatures);
        }