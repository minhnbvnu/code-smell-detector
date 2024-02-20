function BasicView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.dayGrid = _this.instantiateDayGrid();
        _this.dayGrid.isRigid = _this.hasRigidRows();
        if (_this.opt('weekNumbers')) {
            if (_this.opt('weekNumbersWithinDays')) {
                _this.dayGrid.cellWeekNumbersVisible = true;
                _this.dayGrid.colWeekNumbersVisible = false;
            }
            else {
                _this.dayGrid.cellWeekNumbersVisible = false;
                _this.dayGrid.colWeekNumbersVisible = true;
            }
        }
        _this.addChild(_this.dayGrid);
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }