function splitWhen(items, predicate) {
        const result = [[]];
        let groupIndex = 0;
        for (const item of items) {
            if (predicate(item)) {
                groupIndex++;
                result[groupIndex] = [];
            }
            else {
                result[groupIndex].push(item);
            }
        }
        return result;
    }