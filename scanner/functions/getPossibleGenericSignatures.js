function getPossibleGenericSignatures(called, typeArgumentCount, checker) {
            let type = checker.getTypeAtLocation(called);
            if (isOptionalChain(called.parent)) {
                type = removeOptionality(type, isOptionalChainRoot(called.parent), 
                /*isOptionalChain*/
                true);
            }
            const signatures = isNewExpression(called.parent) ? type.getConstructSignatures() : type.getCallSignatures();
            return signatures.filter((candidate) => !!candidate.typeParameters && candidate.typeParameters.length >= typeArgumentCount);
        }