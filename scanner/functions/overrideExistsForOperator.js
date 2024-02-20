function overrideExistsForOperator(operator) {
                return options.overrides && Object.prototype.hasOwnProperty.call(options.overrides, operator);
            }