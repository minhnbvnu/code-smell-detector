function border_radius(border_radius) {
        var _a, _b, _c, _d;
        if ((0, types_1.isNumber)(border_radius)) {
            return {
                top_left: border_radius,
                top_right: border_radius,
                bottom_right: border_radius,
                bottom_left: border_radius,
            };
        }
        else if ((0, types_1.isPlainObject)(border_radius)) {
            return {
                top_left: (_a = border_radius.top_left) !== null && _a !== void 0 ? _a : 0,
                top_right: (_b = border_radius.top_right) !== null && _b !== void 0 ? _b : 0,
                bottom_right: (_c = border_radius.bottom_right) !== null && _c !== void 0 ? _c : 0,
                bottom_left: (_d = border_radius.bottom_left) !== null && _d !== void 0 ? _d : 0,
            };
        }
        else {
            const [top_left = 0, top_right = 0, bottom_right = 0, bottom_left = 0] = border_radius;
            return { top_left, top_right, bottom_right, bottom_left };
        }
    }