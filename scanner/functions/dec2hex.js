function dec2hex(c) {
        if (c < 10) {
            return String.fromCharCode('0'.charCodeAt(0) + c);
        }
        return String.fromCharCode('A'.charCodeAt(0) + c - 10);
    }