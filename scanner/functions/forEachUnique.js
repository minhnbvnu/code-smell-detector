function forEachUnique(array, callback) {
            if (array) {
                for (let i = 0; i < array.length; i++) {
                    if (array.indexOf(array[i]) === i) {
                        const result = callback(array[i], i);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return void 0;
        }