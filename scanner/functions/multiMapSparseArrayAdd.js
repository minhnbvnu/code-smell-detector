function multiMapSparseArrayAdd(map2, key, value) {
            let values = map2[key];
            if (values) {
                values.push(value);
            }
            else {
                map2[key] = values = [value];
            }
            return values;
        }