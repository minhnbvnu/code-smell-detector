function getJsonData(names, data) {
        let key,
            value = data[names[0].slice(1)];

        if (names.length > 1) {
            for (let i = 1; i < names.length; i++) {
                key = names[i].slice(1);
                value = $.isArray(value) ? value[0][key] : value[key];
            }
        }

        return value;
    }