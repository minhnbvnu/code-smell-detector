function skipWhile(predicate) {
    return function (source) { return source.lift(new SkipWhileOperator(predicate)); };
}