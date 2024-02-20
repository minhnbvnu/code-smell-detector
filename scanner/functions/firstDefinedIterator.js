function firstDefinedIterator(iter, callback) {
            for (const value of iter) {
                const result = callback(value);
                if (result !== void 0) {
                    return result;
                }
            }
            return void 0;
        }