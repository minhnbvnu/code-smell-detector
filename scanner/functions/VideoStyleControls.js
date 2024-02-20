function VideoStyleControls(props) {
    _classCallCheck(this, VideoStyleControls);

    var _this = _possibleConstructorReturn(this, (VideoStyleControls.__proto__ || Object.getPrototypeOf(VideoStyleControls)).call(this, props));

    _this.state = {
      visible: false,
      videos: []
    };
    _this.onVideoToggle = _this.onVideoToggle.bind(_this);

    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.getVideoObject = _this.getVideoObject.bind(_this);
    _this.sendVideoToEditor = _this.sendVideoToEditor.bind(_this);
    return _this;
  }