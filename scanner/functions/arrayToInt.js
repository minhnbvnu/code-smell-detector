function arrayToInt (array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = unpackBase60(array[i]);
        }
    }