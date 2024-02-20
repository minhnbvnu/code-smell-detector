function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== (n < 0 ? mathceil(n) : mathfloor(n))) {
            throw Error
            (bignumberError + (name || 'Argument') + (typeof n == 'number'
                ? n < min || n > max ? ' out of range: ' : ' not an integer: '
                : ' not a primitive number: ') + n);
        }
    }