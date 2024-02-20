function AudioStyleControls(props) {
    _classCallCheck(this, AudioStyleControls);

    var _this = _possibleConstructorReturn(this, (AudioStyleControls.__proto__ || Object.getPrototypeOf(AudioStyleControls)).call(this, props));

    _this.state = {
      visible: false,
      audios: []
    }, _this.onAudioToggle = _this.onAudioToggle.bind(_this);
    _this.sendAudioToEditor = _this.sendAudioToEditor.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.getAudioObject = _this.getAudioObject.bind(_this);
    return _this;
  }