function filterPatterns(arr, comparison, prefix, intersection, options) {
        let result = [];
        for (let ele of arr) {
            let { string } = ele;
            // only push if _both_ are negative...
            if (!intersection && !contains(comparison, 'string', string)) {
                result.push(prefix + string);
            }
            // or _both_ are positive
            if (intersection && contains(comparison, 'string', string)) {
                result.push(prefix + string);
            }
        }
        return result;
    }