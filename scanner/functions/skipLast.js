function skipLast(count) {
    return function (source) { return source.lift(new SkipLastOperator(count)); };
}