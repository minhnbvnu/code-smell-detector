function makeNewMessage(types) {
            return types.reduce(function(p, c, i, arr) {
                if (i === arr.length - 1 && arr.length > 1) {
                    return p + "or " + c
                } else if (arr[i + 1] && arr.length > 2) {
                    return p + c + ", "
                } else if (arr[i + 1]) {
                    return p + c + " "
                } else {
                    return p + c
                }
            }, "should be a")
        }