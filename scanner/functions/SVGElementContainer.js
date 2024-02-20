function SVGElementContainer(img) {
            var _this = _super.call(this, img) || this;
            var s = new XMLSerializer();
            _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
            _this.intrinsicWidth = img.width.baseVal.value;
            _this.intrinsicHeight = img.height.baseVal.value;
            CacheStorage.getInstance().addImage(_this.svg);
            return _this;
        }