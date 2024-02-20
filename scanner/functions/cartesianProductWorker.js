function cartesianProductWorker(arrays, result, outer, index) {
            for (const element of arrays[index]) {
                let inner;
                if (outer) {
                    inner = outer.slice();
                    inner.push(element);
                }
                else {
                    inner = [element];
                }
                if (index === arrays.length - 1) {
                    result.push(inner);
                }
                else {
                    cartesianProductWorker(arrays, result, inner, index + 1);
                }
            }
        }