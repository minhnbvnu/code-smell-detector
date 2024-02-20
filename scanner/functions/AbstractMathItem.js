function AbstractMathItem(math, jax, display, start, end) {
            if (display === void 0) {
                display = true;
            }
            if (start === void 0) {
                start = { i: 0, n: 0, delim: '' };
            }
            if (end === void 0) {
                end = { i: 0, n: 0, delim: '' };
            }
            this.root = null;
            this.typesetRoot = null;
            this.metrics = {};
            this.inputData = {};
            this.outputData = {};
            this._state = exports.STATE.UNPROCESSED;
            this.math = math;
            this.inputJax = jax;
            this.display = display;
            this.start = start;
            this.end = end;
            this.root = null;
            this.typesetRoot = null;
            this.metrics = {};
            this.inputData = {};
            this.outputData = {};
        }