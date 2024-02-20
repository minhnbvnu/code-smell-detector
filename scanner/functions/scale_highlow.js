function scale_highlow(range, factor, center) {
        const [low, high] = [range.start, range.end];
        const x = center !== null && center !== void 0 ? center : (high + low) / 2.0;
        const x0 = low - (low - x) * factor;
        const x1 = high - (high - x) * factor;
        return [x0, x1];
    }