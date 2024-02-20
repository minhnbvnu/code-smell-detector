function maskValue(value, settings) {
        if (settings.allowEmpty && value === "") {
            return "";
        }
        if (!!settings.reverse) {
            return maskValueReverse(value, settings);
        }
        return maskValueStandard(value, settings);
    }