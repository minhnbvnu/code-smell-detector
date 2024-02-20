function parseSetCookieString(str) {
        str = cleanCookieString(str);
        str = getFirstPair(str);
        var res = COOKIE_PAIR.exec(str);
        if (!res || !res[VALUE_INDEX])
            return null;
        return {
            name: unescape(res[KEY_INDEX]),
            value: unescape(res[VALUE_INDEX])
        };
    }