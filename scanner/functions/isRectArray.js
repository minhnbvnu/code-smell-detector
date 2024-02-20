function isRectArray(arr) {
            if (!Array.isArray(arr)) {
                return false;
            }
            var width = arr.length;
            if (width === 0 || !isArrayLike(arr[0])) {
                return false;
            }
            return true;
        }