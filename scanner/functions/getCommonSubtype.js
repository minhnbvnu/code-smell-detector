function getCommonSubtype(types) {
                return reduceLeft(types, (s, t) => isTypeSubtypeOf(t, s) ? t : s);
            }