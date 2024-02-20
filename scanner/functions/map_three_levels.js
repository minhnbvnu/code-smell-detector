function map_three_levels(factors, outer_pad, inner_pad, factor_pad, offset = 0) {
        var _b;
        const mapping = new Map();
        const tops = new Map();
        for (const [f0, f1, f2] of factors) {
            const top = (_b = tops.get(f0)) !== null && _b !== void 0 ? _b : [];
            tops.set(f0, [...top, [f1, f2]]);
        }
        let suboffset = offset;
        let total_subpad = 0;
        for (const [f0, top] of tops) {
            const n = top.length;
            const [submap, subpad] = map_two_levels(top, inner_pad, factor_pad, suboffset);
            total_subpad += subpad;
            const subtot = (0, array_1.sum)(top.map(([f1]) => submap.get(f1).value));
            mapping.set(f0, { value: subtot / n, mapping: submap });
            suboffset += n + outer_pad + subpad;
        }
        return [mapping, (tops.size - 1) * outer_pad + total_subpad];
    }