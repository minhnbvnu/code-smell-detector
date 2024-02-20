function isEverySeverityValid(config) {
        return Object.keys(config).every(ruleId => isValidSeverity(config[ruleId]));
    }