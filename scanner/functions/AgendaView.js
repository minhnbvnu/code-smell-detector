function AgendaView(calendar, viewSpec) {
        var _this = _super.call(this, calendar, viewSpec) || this;
        _this.usesMinMaxTime = true; // indicates that minTime/maxTime affects rendering
        _this.timeGrid = _this.instantiateTimeGrid();
        _this.addChild(_this.timeGrid);
        if (_this.opt('allDaySlot')) {
            _this.dayGrid = _this.instantiateDayGrid(); // the all-day subcomponent of this view
            _this.addChild(_this.dayGrid);
        }
        _this.scroller = new Scroller_1.default({
            overflowX: 'hidden',
            overflowY: 'auto'
        });
        return _this;
    }