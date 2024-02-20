function stringToObj(str) {
        var obj = {}, styles = str.split(';');
        utils.each(styles, function (v) {
            var index = v.indexOf(':'),
                key = utils.trim(v.substr(0, index)).toLowerCase();
            key && (obj[key] = utils.trim(v.substr(index + 1) || ''));
        });
        return obj;
    }