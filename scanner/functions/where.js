function where(condition, x0, y0) {
            const x = (0, math_1.is_Floating)(x0) ? x0[math_1.float]() : x0;
            const y = (0, math_1.is_Floating)(y0) ? y0[math_1.float]() : y0;
            const x_num = (0, types_1.isNumber)(x);
            const y_num = (0, types_1.isNumber)(y);
            const fn = (() => {
                if (x_num && y_num)
                    return (cond_i) => cond_i != 0 ? x : y;
                else if (x_num && !y_num)
                    return (cond_i, i) => cond_i != 0 ? x : y[i];
                else if (!x_num && y_num)
                    return (cond_i, i) => cond_i != 0 ? x[i] : y;
                else if ((0, ndarray_1.is_NDArray)(x) && (0, ndarray_1.is_NDArray)(y)) {
                    if ((0, eq_1.is_equal)(x.shape, y.shape) && x.dtype == y.dtype)
                        return (cond_i, i) => cond_i != 0 ? x[i] : y[i];
                    else
                        throw new Error("shape or dtype mismatch");
                }
                else
                    throw new Error("not implemented");
            })();
            return (0, arrayable_1.map)(condition, fn); // TODO: preserve ndarrays
        }