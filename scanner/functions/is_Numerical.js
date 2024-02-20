function is_Numerical(x) {
        return (0, types_1.isNumber)(x) || (0, math_1.is_Floating)(x) || (0, ndarray_1.is_NDArray)(x);
    }