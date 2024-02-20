function ternary(floats, success, failure, not = false) {
    // TODO make this type safe (ran into a type error here)
    // wrap single float in array if need be
    if (!Array.isArray(floats) && floats !== null)
        floats = [floats].map((f) => expr_1.wrapInValue(f));
    // TODO get rid of this cast
    return new TernaryExpr(floats, expr_1.wrapInValue(success), expr_1.wrapInValue(failure), not);
}