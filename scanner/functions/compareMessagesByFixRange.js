function compareMessagesByFixRange(a, b) {
        return a.fix.range[0] - b.fix.range[0] || a.fix.range[1] - b.fix.range[1];
    }