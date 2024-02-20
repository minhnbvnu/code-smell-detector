function Popup(props) {
    classCallCheck_default()(this, Popup);
    var _this = possibleConstructorReturn_default()(this, _Component.call(this, props));
    Popup_initialiseProps.call(_this);
    _this.state = {
      // Used for stretch
      stretchChecked: false,
      targetWidth: undefined,
      targetHeight: undefined
    };
    _this.savePopupRef = saveRef.bind(_this, 'popupInstance');
    _this.saveAlignRef = saveRef.bind(_this, 'alignInstance');
    return _this;
  }