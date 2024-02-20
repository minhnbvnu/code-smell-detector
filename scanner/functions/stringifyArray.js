function stringifyArray(arr, prefix) {
        var ret = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (prefix)
                ret.push(stringify(arr[i], prefix + '[]'));
            else
                ret.push(stringify(arr[i]));
        }
        return ret.join('&');
    }