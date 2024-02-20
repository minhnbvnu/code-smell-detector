function isValidSpreadType(type) {
                const t = removeDefinitelyFalsyTypes(mapType(type, getBaseConstraintOrType));
                return !!(t.flags & (1 /* Any */ | 67108864 /* NonPrimitive */ | 524288 /* Object */ | 58982400 /* InstantiableNonPrimitive */) || t.flags & 3145728 /* UnionOrIntersection */ && every(t.types, isValidSpreadType));
            }