function newlinesIn(src) {
        if (!src)
            return 0;
        var newlines = src.match(/\n/g);
        return newlines ? newlines.length : 0;
    }