function mergeNotPossibleTuples(ret, a, l) {
        var val, j = 0, i = -1;
        if (NPL < l) {
            while (++i < l) {
                if (!NPL) {
                    ret[j++] = a[i];
                } else if (!NOT_POSSIBLES_HASH[(val = a[i]).hashCode]) {
                    ret[j++] = val;
                } else {
                    NPL--;
                }
            }
        }
        NPL = 0;
        NOT_POSSIBLES_HASH = {};
    }