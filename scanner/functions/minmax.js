function minmax(array) {
        let value;
        let min = +Infinity;
        let max = -Infinity;
        for (let i = 0, length = array.length; i < length; i++) {
            value = array[i];
            if (!isNaN(value)) {
                if (value < min) {
                    min = value;
                }
                if (value > max) {
                    max = value;
                }
            }
        }
        return [min, max];
    }