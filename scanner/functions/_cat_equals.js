function _cat_equals(a, b) {
        if (a.length != b.length)
            return false;
        for (let i = 0, end = a.length; i < end; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }