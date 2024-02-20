function multiMapAdd(key, value) {
            let values = this.get(key);
            if (values) {
                values.push(value);
            }
            else {
                this.set(key, values = [value]);
            }
            return values;
        }