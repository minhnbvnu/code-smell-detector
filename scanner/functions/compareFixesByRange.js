function compareFixesByRange(a, b) {
        return a.range[0] - b.range[0] || a.range[1] - b.range[1];
    }