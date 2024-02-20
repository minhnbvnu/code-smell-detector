function region(space, success, failure, not = false) {
    const floats = Array.isArray(space)
        ? space.map((f) => expr_1.wrapInValue(f))
        : typeof space === "number"
            ? expr_1.wrapInValue(space)
            : space;
    if (failure instanceof mergepass_1.EffectLoop) {
        if (!(success instanceof mergepass_1.EffectLoop)) {
            [success, failure] = [failure, success]; // swap the order
            not = !not; // invert the region
        }
    }
    if (success instanceof mergepass_1.EffectLoop) {
        if (!(failure instanceof mergepass_1.EffectLoop)) {
            return success.regionWrap(floats, failure, true, not);
        }
        // double loop, so we have to do separately
        return mergepass_1.loop([
            success.regionWrap(floats, fragcolorexpr_1.fcolor(), false, not),
            failure.regionWrap(floats, fragcolorexpr_1.fcolor(), true, !not),
        ]);
    }
    return ternaryexpr_1.ternary(Array.isArray(floats) ? createDifferenceFloats(floats) : floats, success.brandExprWithRegion(floats), failure.brandExprWithRegion(floats), not);
}