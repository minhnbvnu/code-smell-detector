function sameFlatMap(array, mapfn) {
            let result;
            if (array) {
                for (let i = 0; i < array.length; i++) {
                    const item = array[i];
                    const mapped = mapfn(item, i);
                    if (result || item !== mapped || isArray(mapped)) {
                        if (!result) {
                            result = array.slice(0, i);
                        }
                        if (isArray(mapped)) {
                            addRange(result, mapped);
                        }
                        else {
                            result.push(mapped);
                        }
                    }
                }
            }
            return result || array;
        }