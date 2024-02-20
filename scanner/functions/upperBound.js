function upperBound(array, func) {
            var diff, len, i, current;
            len = array.length;
            i = 0;
            while (len) {
                diff = len >>> 1;
                current = i + diff;
                if (func(array[current])) {
                    len = diff;
                }
                else {
                    i = current + 1;
                    len -= diff + 1;
                }
            }
            return i;
        }