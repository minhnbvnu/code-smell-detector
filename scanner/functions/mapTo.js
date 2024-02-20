function mapTo(value) {
    return function (source) { return source.lift(new MapToOperator(value)); };
}