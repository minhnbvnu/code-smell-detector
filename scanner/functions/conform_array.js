function conform_array(type, array) {
        array.forEach(function (item) {
            return conform(type, item);
        }, type);
    }