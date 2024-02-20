function sumMultidimensionalArray(arr) {
            var i, total = 0;

            if(isArray(arr[0])) {
                for(i=0; i<arr.length; i++) {
                    total += sumMultidimensionalArray(arr[i]);
                }
            } else {
                total = sumArray(arr);
            }
            return total;
        }