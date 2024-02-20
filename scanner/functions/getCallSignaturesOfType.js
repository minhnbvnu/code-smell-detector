function getCallSignaturesOfType(type) {
        if (type_1.isUnionType(type)) {
            const signatures = [];
            for (const t of type.types)
                signatures.push(...getCallSignaturesOfType(t));
            return signatures;
        }
        if (type_1.isIntersectionType(type)) {
            let signatures;
            for (const t of type.types) {
                const sig = getCallSignaturesOfType(t);
                if (sig.length !== 0) {
                    if (signatures !== undefined)
                        return []; // if more than one type of the intersection has call signatures, none of them is useful for inference
                    signatures = sig;
                }
            }
            return signatures === undefined ? [] : signatures;
        }
        return type.getCallSignatures();
    }