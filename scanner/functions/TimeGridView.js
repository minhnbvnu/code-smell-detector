function TimeGridView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.buildDayTable = core.memoize(buildDayTable);
            return _this;
        }