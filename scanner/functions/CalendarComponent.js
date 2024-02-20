function CalendarComponent(el) {
            var _this = _super.call(this) || this;
            _this.elClassNames = [];
            _this.renderSkeleton = memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
            _this.renderToolbars = memoizeRendering(_this._renderToolbars, _this._unrenderToolbars, [_this.renderSkeleton]);
            _this.buildComponentContext = memoize(buildComponentContext);
            _this.buildViewPropTransformers = memoize(buildViewPropTransformers);
            _this.el = el;
            _this.computeTitle = memoize(computeTitle);
            _this.parseBusinessHours = memoize(function (input) {
                return parseBusinessHours(input, _this.context.calendar);
            });
            return _this;
        }