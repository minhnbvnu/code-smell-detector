function _min(a, b) {
        if (isNaN(a))
            return b;
        else if (isNaN(b))
            return a;
        else
            return min(a, b);
    }