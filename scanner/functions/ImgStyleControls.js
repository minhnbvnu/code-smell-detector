function ImgStyleControls(props) {
    _classCallCheck(this, ImgStyleControls);

    var _this = _possibleConstructorReturn(this, (ImgStyleControls.__proto__ || Object.getPrototypeOf(ImgStyleControls)).call(this, props));

    _this.state = {
      provisible: false,
      previsible: false,
      images: [],
      loadingRemoteImageFun: null,
      pfopImages: []
    };
    _this.successedCount = 0;

    _this.onImgToggle = _this.onImgToggle.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.prepareToSendImageToEditor = _this.prepareToSendImageToEditor.bind(_this);
    _this.getImgObject = _this.getImgObject.bind(_this);

    _this.groupAppend = _this.groupAppend.bind(_this);
    _this.failureLoading = _this.failureLoading.bind(_this);
    _this.reloadPfopingPictrue = _this.reloadPfopingPictrue.bind(_this);
    _this.successLoading = _this.successLoading.bind(_this);

    _this.handleCancelUploading = _this.handleCancelUploading.bind(_this);
    _this.realLoading = _this.realLoading.bind(_this);
    _this.reloadUploadingPictrue = _this.reloadUploadingPictrue.bind(_this);
    return _this;
  }