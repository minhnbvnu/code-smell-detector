function isValidNumber(num) {
        return !!num && num !== Infinity && num !== -Infinity && !isNaN(num) || num === 0;
    }