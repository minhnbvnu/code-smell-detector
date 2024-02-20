function checkOverloads(signatures, typeParameters) {
                const result = [];
                const isTypeParameter = getIsTypeParameter(typeParameters);
                for (const overloads of signatures) {
                    forEachPair(overloads, (a, b) => {
                        var _a, _b;
                        const signature0 = (_a = a.value) !== null && _a !== void 0 ? _a : a;
                        const signature1 = (_b = b.value) !== null && _b !== void 0 ? _b : b;
                        const unify = compareSignatures(signature0, signature1, isTypeParameter);
                        if (unify !== undefined) {
                            result.push({ unify, only2: overloads.length === 2 });
                        }
                    });
                }
                return result;
            }