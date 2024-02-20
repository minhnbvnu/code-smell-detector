function mergePossiblesAndNotPossibles(a, l) {
        var ret = EMPTY_ARRAY;
        if (l) {
            if (NPL || PL) {
                ret = [];
                if (!NPL) {
                    mergePossibleTuples(ret, a, l);
                } else if (!PL) {
                    mergeNotPossibleTuples(ret, a, l);
                } else {
                    mergeBothTuples(ret, a, l);
                }
            } else {
                ret = a;
            }
        }
        return ret;
    }