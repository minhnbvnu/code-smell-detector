function getFontId (name, options) {

    var values = getFontId.keys.map(function (key, index) {

        var value = options[key] || getFontId.values[index];

        if (typeof value !== 'string') {
            value = getFontId.values[index];
        } else if (getFontId.alias[key]) {
            value = value.replace.apply(value, getFontId.alias[key]);
        }

        return value;
    });

    values.unshift(name);

    var id = values.join('-');
    id = crypto.createHash('md5').update(id).digest('hex');

    return id;
}