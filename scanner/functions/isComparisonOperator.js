function isComparisonOperator(operator) {
        return /^(==|===|!=|!==|<|>|<=|>=)$/u.test(operator);
    }