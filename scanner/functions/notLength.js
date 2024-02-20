function notLength(obj, l) {
            if (has(obj, "length")) {
                return obj.length !== l;
            }
            return false;
        }