function combineTypes(inferences) {
                if (!inferences.length)
                    return checker.getAnyType();
                const stringNumber = checker.getUnionType([checker.getStringType(), checker.getNumberType()]);
                const priorities = [
                    {
                        high: (t) => t === checker.getStringType() || t === checker.getNumberType(),
                        low: (t) => t === stringNumber
                    },
                    {
                        high: (t) => !(t.flags & (1 /* Any */ | 16384 /* Void */)),
                        low: (t) => !!(t.flags & (1 /* Any */ | 16384 /* Void */))
                    },
                    {
                        high: (t) => !(t.flags & (98304 /* Nullable */ | 1 /* Any */ | 16384 /* Void */)) && !(getObjectFlags(t) & 16 /* Anonymous */),
                        low: (t) => !!(getObjectFlags(t) & 16 /* Anonymous */)
                    }
                ];
                let good = removeLowPriorityInferences(inferences, priorities);
                const anons = good.filter((i) => getObjectFlags(i) & 16 /* Anonymous */);
                if (anons.length) {
                    good = good.filter((i) => !(getObjectFlags(i) & 16 /* Anonymous */));
                    good.push(combineAnonymousTypes(anons));
                }
                return checker.getWidenedType(checker.getUnionType(good.map(checker.getBaseTypeOfLiteralType), 2 /* Subtype */));
            }