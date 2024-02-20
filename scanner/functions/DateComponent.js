function DateComponent(_view, _options) {
        var _this = _super.call(this) || this;
        _this.isRTL = false; // frequently accessed options
        _this.hitsNeededDepth = 0; // necessary because multiple callers might need the same hits
        _this.hasAllDayBusinessHours = false; // TODO: unify with largeUnit and isTimeScale?
        _this.isDatesRendered = false;
        // hack to set options prior to the this.opt calls
        if (_view) {
            _this['view'] = _view;
        }
        if (_options) {
            _this['options'] = _options;
        }
        _this.uid = String(DateComponent.guid++);
        _this.childrenByUid = {};
        _this.nextDayThreshold = moment.duration(_this.opt('nextDayThreshold'));
        _this.isRTL = _this.opt('isRTL');
        if (_this.fillRendererClass) {
            _this.fillRenderer = new _this.fillRendererClass(_this);
        }
        if (_this.eventRendererClass) {
            _this.eventRenderer = new _this.eventRendererClass(_this, _this.fillRenderer);
        }
        if (_this.helperRendererClass && _this.eventRenderer) {
            _this.helperRenderer = new _this.helperRendererClass(_this, _this.eventRenderer);
        }
        if (_this.businessHourRendererClass && _this.fillRenderer) {
            _this.businessHourRenderer = new _this.businessHourRendererClass(_this, _this.fillRenderer);
        }
        return _this;
    }