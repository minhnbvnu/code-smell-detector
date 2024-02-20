function getOwnValues(collection) {
            const values = [];
            for (const key in collection) {
                if (hasOwnProperty.call(collection, key)) {
                    values.push(collection[key]);
                }
            }
            return values;
        }