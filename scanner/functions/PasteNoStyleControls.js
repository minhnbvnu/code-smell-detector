function PasteNoStyleControls(props) {
    _classCallCheck(this, PasteNoStyleControls);

    var _this = _possibleConstructorReturn(this, (PasteNoStyleControls.__proto__ || Object.getPrototypeOf(PasteNoStyleControls)).call(this, props));

    _this.state = {
      visible: false,
      plantext: ""
    };
    _this.onTextToggle = _this.onTextToggle.bind(_this);
    _this.pasteContent = _this.pasteContent.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.sendTextToEditor = _this.sendTextToEditor.bind(_this);
    return _this;
  }