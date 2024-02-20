function valuesAt(arr, indexes) {
            var ret = [];
            indexes = argsToArray(arguments);
            arr = indexes.shift();
            if (isArray(arr) && indexes.length) {
                for (var i = 0, l = indexes.length; i < l; i++) {
                    ret.push(arr[indexes[i]] || null);
                }
            }
            return ret;
        }