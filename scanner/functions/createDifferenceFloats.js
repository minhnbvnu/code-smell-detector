function createDifferenceFloats(floats) {
    const axes = "xy";
    const differences = [];
    if (floats.length !== 4) {
        throw new Error("incorrect amount of points specified for region");
    }
    for (let i = 0; i < 2; i++) {
        differences.push(opexpr_1.op(getcompexpr_1.getcomp(normfragcoordexpr_1.pos(), axes[i]), "-", floats[i]));
    }
    for (let i = 2; i < floats.length; i++) {
        differences.push(opexpr_1.op(floats[i], "-", getcompexpr_1.getcomp(normfragcoordexpr_1.pos(), axes[i - 2])));
    }
    return differences;
}