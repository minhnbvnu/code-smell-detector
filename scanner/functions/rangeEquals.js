function rangeEquals(array1, array2, pos, end) {
            while (pos < end) {
                if (array1[pos] !== array2[pos]) {
                    return false;
                }
                pos++;
            }
            return true;
        }