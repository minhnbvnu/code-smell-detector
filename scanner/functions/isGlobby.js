function isGlobby(str) {
        if (/\([^()]+$/.test(str)) {
            return true;
        }
        if (str[0] === '{' || str[0] === '[') {
            return true;
        }
        if (/[^\\][{[]/.test(str)) {
            return true;
        }
        return isGlob(str);
    }