function DayGrid(view) {
        var _this = _super.call(this, view) || this;
        _this.cellWeekNumbersVisible = false; // display week numbers in day cell?
        _this.bottomCoordPadding = 0; // hack for extending the hit area for the last row of the coordinate grid
        // isRigid determines whether the individual rows should ignore the contents and be a constant height.
        // Relies on the view's colCnt and rowCnt. In the future, this component should probably be self-sufficient.
        _this.isRigid = false;
        _this.hasAllDayBusinessHours = true;
        return _this;
    }