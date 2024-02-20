function outer_size(el) {
        const { margin: { left, right, top, bottom } } = extents(el);
        const { width, height } = size(el);
        return {
            width: Math.ceil(width + left + right),
            height: Math.ceil(height + top + bottom),
        };
    }