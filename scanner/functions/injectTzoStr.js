function injectTzoStr(s, tzoStr) {
        var replaced = false;
        s = s.replace(UTC_RE, function () {
            replaced = true;
            return tzoStr;
        });
        // IE11 doesn't include UTC/GMT in the original string, so append to end
        if (!replaced) {
            s += ' ' + tzoStr;
        }
        return s;
    }