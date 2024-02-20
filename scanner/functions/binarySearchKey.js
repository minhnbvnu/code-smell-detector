function binarySearchKey(array, key, keySelector, keyComparer, offset) {
            if (!some(array)) {
                return -1;
            }
            let low = offset || 0;
            let high = array.length - 1;
            while (low <= high) {
                const middle = low + (high - low >> 1);
                const midKey = keySelector(array[middle], middle);
                switch (keyComparer(midKey, key)) {
                    case -1 /* LessThan */:
                        low = middle + 1;
                        break;
                    case 0 /* EqualTo */:
                        return middle;
                    case 1 /* GreaterThan */:
                        high = middle - 1;
                        break;
                }
            }
            return ~low;
        }