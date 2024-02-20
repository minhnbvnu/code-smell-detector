function collatePatterns(neg, pos, options) {
        let onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
        let onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
        let intersected = filterPatterns(neg, pos, '-?', true, options) || [];
        let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
        return subpatterns.join('|');
    }