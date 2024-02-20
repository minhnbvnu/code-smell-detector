function distinct(arr) {
        var hash = {};
        forEach.call(arr, function (ii) {
            hash[ii] = true;
        });
        return Object_keys(hash);
    }