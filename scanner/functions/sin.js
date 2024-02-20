function sin(x) {
            if ((0, types_1.isNumber)(x))
                return Math.sin(x);
            else if ((0, math_1.is_Floating)(x))
                return Math.sin(x[math_1.float]());
            else
                return (0, arrayable_1.map)(x, (v) => Math.sin(v));
        }