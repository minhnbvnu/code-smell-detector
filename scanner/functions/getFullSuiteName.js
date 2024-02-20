function getFullSuiteName(suite) {
        var parentSuitesNames = suite.parentSuite ? getFullSuiteName(suite.parentSuite) + separator : "";
        return parentSuitesNames + suite.description;
    }