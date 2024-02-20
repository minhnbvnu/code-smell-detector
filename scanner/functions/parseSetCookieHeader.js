function parseSetCookieHeader(header) {
        if (!header)
            return {};
        header = Array.isArray(header) ? header : [header];
        return header.reduce(function (res, str) {
            var cookie = parseSetCookieString(str);
            if (cookie)
                res[cookie.name] = cookie.value;
            return res;
        }, {});
    }