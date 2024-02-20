function colorSinonMatchText(matcher, calledArg, calledArgMessage) {
    var calledArgumentMessage = calledArgMessage;
    if (!matcher.test(calledArg)) {
        matcher.message = color.red(matcher.message);
        if (calledArgumentMessage) {
            calledArgumentMessage = color.green(calledArgumentMessage);
        }
    }
    return calledArgumentMessage + " " + matcher.message;
}