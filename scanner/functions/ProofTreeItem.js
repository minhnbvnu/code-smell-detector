function ProofTreeItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.leftLabel = null;
            _this.rigthLabel = null;
            _this.innerStack = new Stack_js_1.default(_this.factory, {}, true);
            return _this;
        }