function HTMLMathItem(math, jax, display, start, end) {
            if (display === void 0) {
                display = true;
            }
            if (start === void 0) {
                start = { node: null, n: 0, delim: '' };
            }
            if (end === void 0) {
                end = { node: null, n: 0, delim: '' };
            }
            return _super.call(this, math, jax, display, start, end) || this;
        }