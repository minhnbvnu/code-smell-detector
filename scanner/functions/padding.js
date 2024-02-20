function padding(padding) {
        if ((0, types_1.isNumber)(padding)) {
            return { left: padding, right: padding, top: padding, bottom: padding };
        }
        else if ((0, types_1.isPlainObject)(padding)) {
            if ("x" in padding || "y" in padding) {
                const { x = 0, y = 0 } = padding;
                return { left: x, right: x, top: y, bottom: y };
            }
            else if ("left" in padding || "right" in padding || "top" in padding || "bottom" in padding) {
                const { left = 0, right = 0, top = 0, bottom = 0 } = padding;
                return { left, right, top, bottom };
            }
            else {
                (0, assert_1.unreachable)(); // TODO: TypeScript 4.9
            }
        }
        else {
            if (padding.length == 2) {
                const [x = 0, y = 0] = padding;
                return { left: x, right: x, top: y, bottom: y };
            }
            else {
                const [left = 0, right = 0, top = 0, bottom = 0] = padding;
                return { left, right, top, bottom };
            }
        }
    }