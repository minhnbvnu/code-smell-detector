function findFirstResult(inputs, getResult) {
        for (const element of inputs) {
            const result = getResult(element);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }