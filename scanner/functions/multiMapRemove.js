function multiMapRemove(key, value) {
            const values = this.get(key);
            if (values) {
                unorderedRemoveItem(values, value);
                if (!values.length) {
                    this.delete(key);
                }
            }
        }