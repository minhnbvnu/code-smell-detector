function cleanCookieString(str) {
        return str.trim().replace(/\x3B+$/, '');
    }