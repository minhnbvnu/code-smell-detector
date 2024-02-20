function toBaseOut(str, baseIn, baseOut, alphabet) {
                var j,
                    arr = [0],
                    arrL,
                    i = 0,
                    len = str.length;

                for (; i < len;) {
                    for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

                    arr[0] += alphabet.indexOf(str.charAt(i++));

                    for (j = 0; j < arr.length; j++) {

                        if (arr[j] > baseOut - 1) {
                            if (arr[j + 1] == null) arr[j + 1] = 0;
                            arr[j + 1] += arr[j] / baseOut | 0;
                            arr[j] %= baseOut;
                        }
                    }
                }

                return arr.reverse();
            }