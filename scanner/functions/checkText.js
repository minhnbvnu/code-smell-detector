function checkText(actual, expected) {
        return typeof expected === "string"
            ? actual === expected
            : expected.test(actual);
    }