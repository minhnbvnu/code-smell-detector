function reduceAddAsTypeOnlyValues(prevValue, newValue) {
                    return Math.max(prevValue != null ? prevValue : 0, newValue);
                }