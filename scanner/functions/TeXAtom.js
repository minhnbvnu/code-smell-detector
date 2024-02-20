function TeXAtom(factory, attributes, children) {
            var _this = _super.call(this, factory, attributes, children) || this;
            _this.texclass = MmlNode_js_1.TEXCLASS.ORD;
            _this.setProperty('texClass', _this.texClass);
            return _this;
        }