function invertNormalizedValues(values) {
        // Guard against divide by zero error in the inversion calculation below
        if (values.length === 1) {
            return [1];
        }

        const invertedValues = [];
        const numValues = values.length;

        for (let i = 0; i < numValues; ++i) {
            invertedValues.push((1 - values[i]) / (numValues - 1));
        }

        return invertedValues;
    }