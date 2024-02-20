function changecomp(vec, setter, comps, op) {
    return new ChangeCompExpr(vec, expr_1.wrapInValue(setter), comps, op);
}