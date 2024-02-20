function getLowerCaseKeyObject(obj) {
        let newObj = {},
            key;

        if ($.isPlainObject(obj)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[String(key).toLowerCase()] = obj[key];
                }
            }
        }

        return newObj;
    }