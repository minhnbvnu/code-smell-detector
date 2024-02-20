function arrayIsEqualTo(array1, array2, equalityComparer = equateValues) {
            if (!array1 || !array2) {
                return array1 === array2;
            }
            if (array1.length !== array2.length) {
                return false;
            }
            for (let i = 0; i < array1.length; i++) {
                if (!equalityComparer(array1[i], array2[i], i)) {
                    return false;
                }
            }
            return true;
        }