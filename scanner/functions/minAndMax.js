function minAndMax(arr, getValue) {
            Debug.assert(arr.length !== 0);
            let min2 = getValue(arr[0]);
            let max = min2;
            for (let i = 1; i < arr.length; i++) {
                const value = getValue(arr[i]);
                if (value < min2) {
                    min2 = value;
                }
                else if (value > max) {
                    max = value;
                }
            }
            return { min: min2, max };
        }