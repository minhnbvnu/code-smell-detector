function getFullSpecName(spec, separator) {
    separator = separator || " :: ";

    function getFullSuiteName(suite) {
        var parentSuitesNames = suite.parentSuite ? getFullSuiteName(suite.parentSuite) + separator : "";
        return parentSuitesNames + suite.description;
    }

    return getFullSuiteName(spec.suite) + separator + spec.description;
}