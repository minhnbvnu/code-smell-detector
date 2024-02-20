function find_last(array, predicate) {
        const index = (0, exports.find_last_index)(array, predicate);
        return index == -1 ? undefined : array[index];
    }