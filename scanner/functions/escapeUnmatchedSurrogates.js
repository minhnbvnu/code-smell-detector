function escapeUnmatchedSurrogates (arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replaceAll(
        /([\uD800-\uDBFF])(?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])([\uDC00-\uDFFF])/gu,
        function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
            // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
            //   but Chrome having problems
            if (unmatchedHighSurrogate) {
                return '^2' + unmatchedHighSurrogate.codePointAt()
                    .toString(16).padStart(4, '0');
            }
            return (precedingLow || '') + '^3' +
                unmatchedLowSurrogate.codePointAt().toString(16).padStart(4, '0');
        }
    );
}