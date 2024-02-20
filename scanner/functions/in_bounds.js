function in_bounds(value, dimension) {
        const [min, max] = latlon_bounds[dimension];
        return min < value && value < max;
    }