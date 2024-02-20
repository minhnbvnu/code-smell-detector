function num_mean(data, mask) {
        let sum = 0;
        let length = 0;
        for (let i = 0; i < data.length; i++) {
            if (mask[i]) {
                sum = plus(sum, data[i]);
                length++;
            }
        }
        return divide(sum, length);
    }