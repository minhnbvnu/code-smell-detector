function getEqualsKind(operator) {
        switch (operator) {
            case '==':
                return {
                    isPositive: true,
                    isStrict: false,
                };
            case '===':
                return {
                    isPositive: true,
                    isStrict: true,
                };
            case '!=':
                return {
                    isPositive: false,
                    isStrict: false,
                };
            case '!==':
                return {
                    isPositive: false,
                    isStrict: true,
                };
            default:
                return undefined;
        }
    }