function single(predicate) {
    return function (source) { return source.lift(new SingleOperator(predicate, source)); };
}