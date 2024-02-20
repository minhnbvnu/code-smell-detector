function optionEquals(optionName, optionValue) {
            return (context) => context.options && context.options[optionName] === optionValue;
        }