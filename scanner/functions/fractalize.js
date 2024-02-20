function fractalize(pos, octaves, func) {
    if (octaves < 0)
        throw new Error("octaves can't be < 0");
    const recurse = (pos, size, level) => {
        if (level <= 0)
            return expr_1.pfloat(0);
        return opexpr_1.op(func(opexpr_1.op(pos, "/", size * 2)), "+", recurse(pos, size / 2, level - 1));
    };
    return recurse(pos, 0.5, octaves);
}