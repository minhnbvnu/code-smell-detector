function mergePossibleTuples(ret, a, l) {
        var val, j = 0, i = -1;
        if (PL < l) {
            while (PL && ++i < l) {
                if (POSSIBLES_HASH[(val = a[i]).hashCode]) {
                    ret[j++] = val;
                    PL--;
                }
            }
        } else {
            pPush.apply(ret, a);
        }
        PL = 0;
        POSSIBLES_HASH = {};
    }