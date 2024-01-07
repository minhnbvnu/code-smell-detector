function getNormalizedValues(items, propertyName) {
        const sum = sumValues(items, propertyName);
        const normalizedValues = [];
        const numItems = items.length;

        if (sum === 0) {
            for (let i = 0; i < numItems; ++i) {
                normalizedValues.push(1 / numItems);
            }
        } else {
            for (let i = 0; i < numItems; ++i) {
                normalizedValues.push(items[i][propertyName] / sum);
            }
        }

        return normalizedValues;
    }