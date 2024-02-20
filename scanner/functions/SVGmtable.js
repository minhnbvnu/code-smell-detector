function SVGmtable(factory, node, parent) {
            if (parent === void 0) {
                parent = null;
            }
            var _this = _super.call(this, factory, node, parent) || this;
            var def = { 'data-labels': true };
            if (_this.isTop) {
                def.transform = 'matrix(1 0 0 -1 0 0)';
            }
            _this.labels = _this.svg('g', def);
            return _this;
        }