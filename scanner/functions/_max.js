function _max(a, b) {
        if (isNaN(a))
            return b;
        else if (isNaN(b))
            return a;
        else
            return max(a, b);
    }