function SimpleDayGrid(dayGrid) {
            var _this = _super.call(this, dayGrid.el) || this;
            _this.slicer = new DayGridSlicer();
            _this.dayGrid = dayGrid;
            return _this;
        }