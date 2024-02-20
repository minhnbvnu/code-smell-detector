function range$1(num, start, step$$1) {
        return Array(num).fill(0).map(function (_, i) { return start + (i * step$$1); });
    }