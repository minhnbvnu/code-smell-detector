function ScrollGeomCache(scrollController, doesListening) {
            var _this = _super.call(this) || this;
            _this.handleScroll = function () {
                _this.scrollTop = _this.scrollController.getScrollTop();
                _this.scrollLeft = _this.scrollController.getScrollLeft();
                _this.handleScrollChange();
            };
            _this.scrollController = scrollController;
            _this.doesListening = doesListening;
            _this.scrollTop = _this.origScrollTop = scrollController.getScrollTop();
            _this.scrollLeft = _this.origScrollLeft = scrollController.getScrollLeft();
            _this.scrollWidth = scrollController.getScrollWidth();
            _this.scrollHeight = scrollController.getScrollHeight();
            _this.clientWidth = scrollController.getClientWidth();
            _this.clientHeight = scrollController.getClientHeight();
            _this.clientRect = _this.computeClientRect(); // do last in case it needs cached values
            if (_this.doesListening) {
                _this.getEventTarget().addEventListener('scroll', _this.handleScroll);
            }
            return _this;
        }