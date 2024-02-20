function _minWidth(col) {
        const padding = col.padding || [];
        const minWidth = 1 + (padding[left] || 0) + (padding[right] || 0);
        if (col.border) {
            return minWidth + 4;
        }
        return minWidth;
    }