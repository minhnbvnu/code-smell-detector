function assertIfNotNegated(assertion, message, extra) {
            assertion.assert(false, message, null, extra.expected, extra.actual);
        }