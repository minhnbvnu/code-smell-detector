function reportFirstSpecFailure(results) {
    for (var i = 0; i < results.length; i++) {
        if (!results[i].passed()) {
            var result = results[i];
            reporter.assertion({
                result: false,
                actual: result.actual,
                expected: result.expected,
                message: result.message,
                error: result.trace,
                source: result.trace.stack
            });
            return;
        }
    }

}