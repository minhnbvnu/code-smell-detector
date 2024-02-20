function sort_by(array, key) {
        const tmp = Array.from(array, (value, index) => {
            return { index, key: key(value) };
        });
        tmp.sort((left, right) => {
            const a = left.key;
            const b = right.key;
            if (a !== b) {
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
            }
            return left.index - right.index;
        });
        return map(array, (_, i) => array[tmp[i].index]);
    }