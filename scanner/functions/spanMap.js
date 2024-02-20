function spanMap(array, keyfn, mapfn) {
            let result;
            if (array) {
                result = [];
                const len = array.length;
                let previousKey;
                let key;
                let start = 0;
                let pos = 0;
                while (start < len) {
                    while (pos < len) {
                        const value = array[pos];
                        key = keyfn(value, pos);
                        if (pos === 0) {
                            previousKey = key;
                        }
                        else if (key !== previousKey) {
                            break;
                        }
                        pos++;
                    }
                    if (start < pos) {
                        const v = mapfn(array.slice(start, pos), previousKey, start, pos);
                        if (v) {
                            result.push(v);
                        }
                        start = pos;
                    }
                    previousKey = key;
                    pos++;
                }
            }
            return result;
        }