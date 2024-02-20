function findWithFunction(a, f) {
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (f(a[i])) {
                    return i;
                }
            }
        }
        return -1;
    }