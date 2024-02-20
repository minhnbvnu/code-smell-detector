function getRangesWhere(arr, pred, cb) {
            let start;
            for (let i = 0; i < arr.length; i++) {
                if (pred(arr[i])) {
                    start = start === void 0 ? i : start;
                }
                else {
                    if (start !== void 0) {
                        cb(start, i);
                        start = void 0;
                    }
                }
            }
            if (start !== void 0)
                cb(start, arr.length);
        }