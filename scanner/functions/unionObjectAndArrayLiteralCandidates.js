function unionObjectAndArrayLiteralCandidates(candidates) {
                if (candidates.length > 1) {
                    const objectLiterals = filter(candidates, isObjectOrArrayLiteralType);
                    if (objectLiterals.length) {
                        const literalsType = getUnionType(objectLiterals, 2 /* Subtype */);
                        return concatenate(filter(candidates, (t) => !isObjectOrArrayLiteralType(t)), [literalsType]);
                    }
                }
                return candidates;
            }