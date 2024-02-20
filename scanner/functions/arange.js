function arange(start, end, step = 1) {
            const array = (0, array_1.range)(start, end, step);
            return (0, ndarray_1.ndarray)(array, { shape: [array.length], dtype: "float64" });
        }