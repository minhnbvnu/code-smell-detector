function exhaust() {
    return function (source) { return source.lift(new SwitchFirstOperator()); };
}