function vec4(comp1, comp2, comp3, comp4) {
    return new expr_1.BasicVec4(...vecSourceList(...[comp1, comp2, comp3, comp4].map((c) => expr_1.wrapInValue(c))));
}