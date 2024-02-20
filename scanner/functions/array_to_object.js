function array_to_object(array, value) {
        var i, object = {};
        for (i = 0; i < array.length; i += 1) {
            object[array[i]] = value;
        }
        return object;
    }