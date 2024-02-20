function sequenceEqual(compareTo, comparor) {
    return function (source) { return source.lift(new SequenceEqualOperator(compareTo, comparor)); };
}