function mapAllOrFail(array, mapFn) {
            const result = [];
            for (let i = 0; i < array.length; i++) {
                const mapped = mapFn(array[i], i);
                if (mapped === void 0) {
                    return void 0;
                }
                result.push(mapped);
            }
            return result;
        }