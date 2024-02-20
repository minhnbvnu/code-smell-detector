function sameMap(array, f) {
            if (array) {
                for (let i = 0; i < array.length; i++) {
                    const item = array[i];
                    const mapped = f(item, i);
                    if (item !== mapped) {
                        const result = array.slice(0, i);
                        result.push(mapped);
                        for (i++; i < array.length; i++) {
                            result.push(f(array[i], i));
                        }
                        return result;
                    }
                }
            }
            return array;
        }