function dof(depth, rad, depthInfo, reps) {
    return new DoFLoop(expr_1.wrapInValue(depth), expr_1.wrapInValue(rad), expr_1.wrapInValue(depthInfo), reps);
}