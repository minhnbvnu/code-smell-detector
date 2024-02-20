function countWhere(array, predicate) {
            let count = 0;
            if (array) {
                for (let i = 0; i < array.length; i++) {
                    const v = array[i];
                    if (predicate(v, i)) {
                        count++;
                    }
                }
            }
            return count;
        }