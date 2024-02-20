function pairwise() {
    return function (source) { return source.lift(new PairwiseOperator()); };
}