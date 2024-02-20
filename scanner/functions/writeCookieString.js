function writeCookieString(obj) {
        return Object.keys(obj).reduce(function (str, name) {
            var encodedName = encodeCookieComponent(name);
            var encodedValue = encodeCookieComponent(obj[name]);
            str += (str ? '; ' : '') + encodedName + '=' + encodedValue;
            return str;
        }, '');
    }