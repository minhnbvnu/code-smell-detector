function color2rgba(color, alpha = 1.0) {
        const [r, g, b, a] = (() => {
            var _a;
            if (color == null)
                return transparent();
            else if ((0, types_1.isInteger)(color))
                return decode_rgba(color);
            else if ((0, types_1.isString)(color))
                return (_a = css4_parse(color)) !== null && _a !== void 0 ? _a : transparent();
            else {
                if (color.length == 2) {
                    const [name, alpha] = color;
                    return color2rgba(name, alpha);
                }
                else {
                    const [r, g, b, a = 1.0] = color;
                    return [r, g, b, byte(a * 255)];
                }
            }
        })();
        return [r, g, b, byte(alpha * a)];
    }