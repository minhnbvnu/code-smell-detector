function isAlwaysThenable(checker, node) {
        const type = checker.getTypeAtLocation(node);
        for (const subType of tsutils.unionTypeParts(checker.getApparentType(type))) {
            const thenProp = subType.getProperty('then');
            // If one of the alternates has no then property, it is not thenable in all
            // cases.
            if (thenProp === undefined) {
                return false;
            }
            // We walk through each variation of the then property. Since we know it
            // exists at this point, we just need at least one of the alternates to
            // be of the right form to consider it thenable.
            const thenType = checker.getTypeOfSymbolAtLocation(thenProp, node);
            let hasThenableSignature = false;
            for (const subType of tsutils.unionTypeParts(thenType)) {
                for (const signature of subType.getCallSignatures()) {
                    if (signature.parameters.length !== 0 &&
                        isFunctionParam(checker, signature.parameters[0], node)) {
                        hasThenableSignature = true;
                        break;
                    }
                }
                // We only need to find one variant of the then property that has a
                // function signature for it to be thenable.
                if (hasThenableSignature) {
                    break;
                }
            }
            // If no flavors of the then property are thenable, we don't consider the
            // overall type to be thenable
            if (!hasThenableSignature) {
                return false;
            }
        }
        // If all variants are considered thenable (i.e. haven't returned false), we
        // consider the overall type thenable
        return true;
    }