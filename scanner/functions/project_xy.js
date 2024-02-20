function project_xy(x, y) {
        const n = min(x.length, y.length);
        const ArrayType = (0, types_1.infer_type)(x, y);
        const merc_x = new ArrayType(n);
        const merc_y = new ArrayType(n);
        exports.inplace.project_xy(x, y, merc_x, merc_y);
        return [merc_x, merc_y];
    }