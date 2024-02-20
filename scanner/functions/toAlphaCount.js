function toAlphaCount(n) {
        var a = 'A'.charCodeAt(0),
            z = 'Z'.charCodeAt(0),
            len = z - a + 1,
            s = '';
        while (n >= 0) {
            s = String.fromCharCode(n % len + a) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }