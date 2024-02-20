function Trigger(props) {
    classCallCheck_default()(this, Trigger);
    var _this = possibleConstructorReturn_default()(this, _React$Component.call(this, props));
    es_initialiseProps.call(_this);
    var popupVisible = void 0;
    if ('popupVisible' in props) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    _this.state = {
      prevPopupVisible: popupVisible,
      popupVisible: popupVisible
    };
    ALL_HANDLERS.forEach(function (h) {
      _this['fire' + h] = function (e) {
        _this.fireEvents(h, e);
      };
    });
    return _this;
  }