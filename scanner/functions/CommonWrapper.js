function CommonWrapper(factory, node, parent) {
            if (parent === void 0) {
                parent = null;
            }
            var _this = _super.call(this, factory, node) || this;
            _this.parent = null;
            _this.removedStyles = null;
            _this.styles = null;
            _this.variant = '';
            _this.bboxComputed = false;
            _this.stretch = FontData_js_1.NOSTRETCH;
            _this.font = null;
            _this.parent = parent;
            _this.font = factory.jax.font;
            _this.bbox = BBox_js_1.BBox.zero();
            _this.getStyles();
            _this.getVariant();
            _this.getScale();
            _this.getSpace();
            _this.childNodes = node.childNodes.map(function (child) {
                var wrapped = _this.wrap(child);
                if (wrapped.bbox.pwidth && (node.notParent || node.isKind('math'))) {
                    _this.bbox.pwidth = BBox_js_1.BBox.fullWidth;
                }
                return wrapped;
            });
            return _this;
        }