function serial(list) {
            if (isArray(list)) {
                return callNext(list, [], false);
            } else {
                throw new Error("When calling promise.serial the first argument must be an array");
            }
        }