function hatch_pattern_to_index(pattern) {
        var _a, _b;
        return (_b = hatch_pattern_lookup[(_a = patterns_1.hatch_aliases[pattern]) !== null && _a !== void 0 ? _a : pattern]) !== null && _b !== void 0 ? _b : 0;
    }