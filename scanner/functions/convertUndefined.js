function convertUndefined(obj) {
        Object
            .entries(obj)
            .forEach(([key, value]) => {
            if (!!value && (typeof value === 'object')) {
                convertUndefined(value);
            }
            else if (value === undefined) {
                obj[key] = null;
            }
        });
        return obj;
    }