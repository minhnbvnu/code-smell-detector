function checkForKnownIssueHandler(subject, isKnownIssueUrl) {
    if (isKnownIssueUrl !== undefined) {
        return undefined;
    }
    for (let {regex, handler} of knownIssueRegexes) {
        //noinspection JSUnusedAssignment
        if (regex.test(subject)) {
            //noinspection JSUnusedAssignment
            return handler;
        }
    }
    return undefined;
}