function isProtoString(s) {
        if (!s) {
            return false;
        }
        var length = s.length;
        if (length < 9 /* "__proto__".length */) {
            return false;
        }
        if (s.charCodeAt(length - 1) !== 95 /* '_' */ ||
            s.charCodeAt(length - 2) !== 95 /* '_' */ ||
            s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
            s.charCodeAt(length - 4) !== 116 /* 't' */ ||
            s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
            s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
            s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
            s.charCodeAt(length - 8) !== 95 /* '_' */ ||
            s.charCodeAt(length - 9) !== 95 /* '_' */) {
            return false;
        }
        for (var i = length - 10; i >= 0; i--) {
            if (s.charCodeAt(i) !== 36 /* '$' */) {
                return false;
            }
        }
        return true;
    }