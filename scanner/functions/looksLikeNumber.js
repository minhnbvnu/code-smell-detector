function looksLikeNumber(x) {
        if (x === null || x === undefined)
            return false;
        if (typeof x === 'number')
            return true;
        if (/^0x[0-9a-f]+$/i.test(x))
            return true;
        if (/^0[^.]/.test(x))
            return false;
        return /^[-]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }