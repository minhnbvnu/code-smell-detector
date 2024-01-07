function createSumArray(values, order) {
        const sumArray = [];
        sumArray[order[values.length - 1]] = values[order[values.length - 1]];

        for (let i = values.length - 2; i >= 0; --i) {
            sumArray[order[i]] = sumArray[order[i + 1]] + values[order[i]];
        }

        return sumArray;
    }