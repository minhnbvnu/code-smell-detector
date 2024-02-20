function HTMLAdaptor(window) {
            var _this = _super.call(this, window.document) || this;
            _this.window = window;
            _this.parser = new window.DOMParser();
            return _this;
        }