function assertIfNegated(assertion, message, extra) {
            assertion.assert(true, null, message, extra.expected, extra.actual);
        }