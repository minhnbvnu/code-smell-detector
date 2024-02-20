function is_NDArray(v) {
        return (0, types_1.isObject)(v) && __ndarray__ in v;
    }