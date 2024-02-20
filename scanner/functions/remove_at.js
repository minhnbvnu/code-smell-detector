function remove_at(array, i) {
        (0, assert_1.assert)((0, types_1.isInteger)(i) && i >= 0);
        const result = copy(array);
        result.splice(i, 1);
        return result;
    }