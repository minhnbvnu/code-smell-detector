function _find_index(dir) {
        return function (array, predicate) {
            const length = array.length;
            let index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index]))
                    return index;
            }
            return -1;
        };
    }