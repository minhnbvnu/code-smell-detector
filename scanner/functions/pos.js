function pos(x) {
            if ((0, types_1.isNumber)(x))
                return +x;
            else if ((0, math_1.is_Floating)(x))
                return +x[math_1.float]();
            else
                return (0, arrayable_1.map)(x, (v) => +v);
        }