function resolveCalculator(calculator) {
    if (!calculator) {
        return undefined;
    }

    var forColumnName = ' (for column "' + this.name + '").';

    if (typeof calculator === 'function') {
        calculator = calculator.toString();
    } else if (typeof calculator !== 'string') {
        throw new HypergridError('Expected calculator function OR string containing calculator function OR calculator name' + forColumnName);
    }

    var matches, key,
        calculators = this.behavior.grid.properties.calculators || (this.behavior.grid.properties.calculators = {});

    if (/^\w+$/.test(calculator)) { // just a function name?
        // use as registry key but make sure it is in fact a registered calculator
        key = calculator;
        if (!calculators[key]) {
            throw new HypergridError('Unknown calculator name "' + key + forColumnName);
        }

    } else if ((matches = calculator.match(REGEX_NAMED_FUNC))) { // named stringified function?
        // extract function name from stringified function to use as registry key
        key = matches[1];

    } else if (REGEX_ANON_FUNC.test(calculator)) { // anonymous stringified function?
        // use entire anonymous stringified function as registry key
        key = calculator;

    } else if (REGEX_ARROW_FUNC.test(calculator)) {
        throw new HypergridError('Arrow function not permitted as column calculator ' + forColumnName);
    }

    if (!calculators[key]) { // neither a string nor a function (previously functionified string)?
        calculators[key] = calculator;
    }

    // functionify existing entries as well as new `calculators` entries
    calculators[key] = toFunction(calculators[key]);

    return calculators[key];
}