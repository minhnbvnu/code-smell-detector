function protoItem(open, math, close, n, start, end, display) {
        if (display === void 0) {
            display = null;
        }
        var item = { open: open, math: math, close: close,
            n: n, start: { n: start }, end: { n: end }, display: display };
        return item;
    }