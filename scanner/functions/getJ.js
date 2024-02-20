function getJ(value, arr) {
            var j = 1;
            while (value >= arr[j]) {
                j += 1;
            }
            return j;
        }