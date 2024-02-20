function permutations(arr, length) {
            var ret = [];
            if (isArray(arr)) {
                var copy = arr.slice(0);
                if (typeof length !== "number") {
                    length = arr.length;
                }
                if (!length) {
                    ret = [
                        []
                    ];
                } else if (length <= arr.length) {
                    ret = reduce(arr, function (a, b, i) {
                        var ret;
                        if (length > 1) {
                            ret = permute(b, rotate(copy, i).slice(1), length);
                        } else {
                            ret = [
                                [b]
                            ];
                        }
                        return a.concat(ret);
                    }, []);
                }
            }
            return ret;
        }