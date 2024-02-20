function SimpleTimeGrid(timeGrid) {
            var _this = _super.call(this, timeGrid.el) || this;
            _this.buildDayRanges = core.memoize(buildDayRanges);
            _this.slicer = new TimeGridSlicer();
            _this.timeGrid = timeGrid;
            return _this;
        }