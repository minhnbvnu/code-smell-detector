function DayHeader(parentEl) {
            var _this = _super.call(this) || this;
            _this.renderSkeleton = memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
            _this.parentEl = parentEl;
            return _this;
        }