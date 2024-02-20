function flatMapToMutable(array, mapfn) {
            const result = [];
            if (array) {
                for (let i = 0; i < array.length; i++) {
                    const v = mapfn(array[i], i);
                    if (v) {
                        if (isArray(v)) {
                            addRange(result, v);
                        }
                        else {
                            result.push(v);
                        }
                    }
                }
            }
            return result;
        }