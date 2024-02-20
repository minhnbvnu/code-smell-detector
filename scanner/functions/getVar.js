function getVar (_, pre, key) {
        var r = typeof env === 'function' ? env(key) : env[key];
        if (r === undefined) r = '';

        if (typeof r === 'object') {
            return pre + TOKEN + JSON.stringify(r) + TOKEN;
        }
        else return pre + r;
    }