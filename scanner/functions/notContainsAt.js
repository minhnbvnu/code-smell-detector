function notContainsAt(arr, obj, index) {
            if (isArray(arr)) {
                return !isEq(arr[index], obj);
            }
            return false;
        }