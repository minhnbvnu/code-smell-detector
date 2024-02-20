function transpose(arr) {
            var ret = [];
            if (isArray(arr) && arr.length) {
                var last;
                forEach(arr, function (a) {
                    if (isArray(a) && (!last || a.length === last.length)) {
                        forEach(a, function (b, i) {
                            if (!ret[i]) {
                                ret[i] = [];
                            }
                            ret[i].push(b);
                        });
                        last = a;
                    }
                });
            }
            return ret;
        }