function isArrayOf(array, predicate) {
        for (const item of array) {
            if (!predicate(item))
                return false;
        }
        return true;
    }