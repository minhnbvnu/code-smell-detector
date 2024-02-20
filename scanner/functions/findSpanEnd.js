function findSpanEnd(array, test, start) {
                let i = start;
                while (i < array.length && test(array[i])) {
                    i++;
                }
                return i;
            }