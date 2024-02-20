function vec2(comp1, comp2) {
    return new expr_1.BasicVec2(...vecSourceList(...[comp1, comp2].map((c) => expr_1.wrapInValue(c))));
}