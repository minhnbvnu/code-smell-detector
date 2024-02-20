function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
            (e < 0 ? 'e' : 'e+') + e;
    }