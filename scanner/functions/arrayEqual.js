function arrayEqual(a, b) {
        var idx;
        if (a.length !== b.length) {
            return false;
        }
        for (idx = 0; idx < a.length; idx += 1) {
            if (a[idx] !== b[idx]) {
                return false;
            }
        }
        return true;
    }