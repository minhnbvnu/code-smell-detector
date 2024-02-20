function finalize(callback) {
    return function (source) { return source.lift(new FinallyOperator(callback)); };
}