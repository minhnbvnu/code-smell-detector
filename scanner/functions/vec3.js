function vec3(comp1, comp2, comp3) {
    return new expr_1.BasicVec3(...vecSourceList(...[comp1, comp2, comp3].map((c) => expr_1.wrapInValue(c))));
}