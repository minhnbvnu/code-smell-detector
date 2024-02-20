function clip_mercator(low, high, dimension) {
        const [vmin, vmax] = mercator_bounds[dimension];
        return [max(low, vmin), min(high, vmax)];
    }