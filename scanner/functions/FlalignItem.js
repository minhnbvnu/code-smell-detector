function FlalignItem(factory, name, numbered, padded, center) {
            var _this = _super.call(this, factory) || this;
            _this.name = name;
            _this.numbered = numbered;
            _this.padded = padded;
            _this.center = center;
            _this.factory.configuration.tags.start(name, numbered, numbered);
            return _this;
        }