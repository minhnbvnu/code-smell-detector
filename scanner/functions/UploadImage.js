function UploadImage(props) {
    _classCallCheck(this, UploadImage);

    var _this2 = _possibleConstructorReturn(this, (UploadImage.__proto__ || Object.getPrototypeOf(UploadImage)).call(this, props));

    _this2.state = {
      isLoad: false,
      qiniu: {
        token: _this2.props.uploadConfig && Object.keys(_this2.props.uploadConfig).length ? _publicDatas.PRO_QINIU.checkQiniu.returnToken(_this2.props.uploadConfig) : null
      },
      files: [],
      upReceiverFun: null,
      inputVideoUrl: "",
      inputVideoHelp: ""
    };

    _this2.getInputVideo = _this2.getInputVideo.bind(_this2);
    _this2.changeInputVideo = _this2.changeInputVideo.bind(_this2);
    return _this2;
  }