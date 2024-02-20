function arrayIsSorted(array, comparer) {
            if (array.length < 2)
                return true;
            for (let i = 1, len = array.length; i < len; i++) {
                if (comparer(array[i - 1], array[i]) === 1 /* GreaterThan */) {
                    return false;
                }
            }
            return true;
        }