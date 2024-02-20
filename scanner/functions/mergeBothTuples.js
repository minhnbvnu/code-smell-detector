function mergeBothTuples(ret, a, l) {
        if (PL === l) {
            mergeNotPossibles(ret, a, l);
        } else if (NPL < l) {
            var val, j = 0, i = -1, hashCode;
            while (++i < l) {
                if (!NOT_POSSIBLES_HASH[(hashCode = (val = a[i]).hashCode)] && POSSIBLES_HASH[hashCode]) {
                    ret[j++] = val;
                }
            }
        }
        NPL = 0;
        NOT_POSSIBLES_HASH = {};
        PL = 0;
        POSSIBLES_HASH = {};
    }