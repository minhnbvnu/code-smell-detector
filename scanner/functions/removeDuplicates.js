function removeDuplicates(arr) {
            var ret = [], i = -1, l, retLength = 0;
            if (arr) {
                l = arr.length;
                while (++i < l) {
                    var item = arr[i];
                    if (indexOf(ret, item) === -1) {
                        ret[retLength++] = item;
                    }
                }
            }
            return ret;
        }