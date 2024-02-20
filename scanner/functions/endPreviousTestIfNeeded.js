function endPreviousTestIfNeeded() {
    if (previous_test) {
        reporter.test_end({
            passed: assertions === 0,
            name: previous_test.name
        });
    }
}