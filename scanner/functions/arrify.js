function arrify(a) {
        return isArray(a) ? a : a ? [a] : [];
    }