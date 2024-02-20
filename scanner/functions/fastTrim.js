function fastTrim(s) {
        if (s == null) {
            return null;
        }
        var str = s.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
        while (ws.test(str.charAt(--i))) {
        }
        return str.slice(0, i + 1);
    }