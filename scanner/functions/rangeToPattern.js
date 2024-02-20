function rangeToPattern(start, stop, options) {
        if (start === stop) {
            return { pattern: start, count: [], digits: 0 };
        }
        let zipped = zip(start, stop);
        let digits = zipped.length;
        let pattern = '';
        let count = 0;
        for (let i = 0; i < digits; i++) {
            let [startDigit, stopDigit] = zipped[i];
            if (startDigit === stopDigit) {
                pattern += startDigit;
            }
            else if (startDigit !== '0' || stopDigit !== '9') {
                pattern += toCharacterClass(startDigit, stopDigit, options);
            }
            else {
                count++;
            }
        }
        if (count) {
            pattern += options.shorthand === true ? '\\d' : '[0-9]';
        }
        return { pattern, count: [count], digits };
    }