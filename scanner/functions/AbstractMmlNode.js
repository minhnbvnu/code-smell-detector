function AbstractMmlNode(factory, attributes, children) {
            if (attributes === void 0) {
                attributes = {};
            }
            if (children === void 0) {
                children = [];
            }
            var _this = _super.call(this, factory) || this;
            _this.prevClass = null;
            _this.prevLevel = null;
            _this.texclass = null;
            if (_this.arity < 0) {
                _this.childNodes = [factory.create('inferredMrow')];
                _this.childNodes[0].parent = _this;
            }
            _this.setChildren(children);
            _this.attributes = new Attributes_js_1.Attributes(factory.getNodeClass(_this.kind).defaults, factory.getNodeClass('math').defaults);
            _this.attributes.setList(attributes);
            return _this;
        }