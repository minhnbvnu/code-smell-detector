function objectMapKey(obj, callback) {
        const values = [];
        objectForEachKey(obj, key => {
            values.push(callback(key));
        });
        return values;
    }