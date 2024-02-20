function verifyIsValidAssertion(assertionMethod, assertionArgs) {
    switch (assertionMethod) {
        case "notCalled":
        case "called":
        case "calledOnce":
        case "calledTwice":
        case "calledThrice":
            if (assertionArgs.length !== 0) {
                assert.fail(
                    assertionMethod +
                        " takes 1 argument but was called with " +
                        (assertionArgs.length + 1) +
                        " arguments"
                );
            }
            break;
        default:
            break;
    }
}