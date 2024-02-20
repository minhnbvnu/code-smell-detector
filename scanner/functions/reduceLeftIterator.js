function reduceLeftIterator(iterator, f, initial) {
            let result = initial;
            if (iterator) {
                let pos = 0;
                for (const value of iterator) {
                    result = f(result, value, pos);
                    pos++;
                }
            }
            return result;
        }