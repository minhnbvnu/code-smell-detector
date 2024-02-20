function reduceLeft(array, f, initial, start, count) {
            if (array && array.length > 0) {
                const size = array.length;
                if (size > 0) {
                    let pos = start === void 0 || start < 0 ? 0 : start;
                    const end = count === void 0 || pos + count > size - 1 ? size - 1 : pos + count;
                    let result;
                    if (arguments.length <= 2) {
                        result = array[pos];
                        pos++;
                    }
                    else {
                        result = initial;
                    }
                    while (pos <= end) {
                        result = f(result, array[pos], pos);
                        pos++;
                    }
                    return result;
                }
            }
            return initial;
        }