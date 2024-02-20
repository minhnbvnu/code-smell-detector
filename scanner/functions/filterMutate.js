function filterMutate(array, f) {
            let outIndex = 0;
            for (let i = 0; i < array.length; i++) {
                if (f(array[i], i, array)) {
                    array[outIndex] = array[i];
                    outIndex++;
                }
            }
            array.length = outIndex;
        }