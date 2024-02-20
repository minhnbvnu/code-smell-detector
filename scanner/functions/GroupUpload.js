function GroupUpload(props) {
    _classCallCheck(this, GroupUpload);

    var _this = _possibleConstructorReturn(this, (GroupUpload.__proto__ || Object.getPrototypeOf(GroupUpload)).call(this, props));

    _this.state = {
      showPictureSeletor: false,
      pictureList: _this.props.imageList || [],
      selectedPictureList: [],
      isAutoWaterMark: false,
      selectedWaterMarkType: "white_big",
      selectedWaterMarkPositon: "SouthEast",
      isAutoSize: true
    };
    _this.openModal = _this.openModal.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.handlePictureSeletorOK = _this.handlePictureSeletorOK.bind(_this);
    _this.getPictures = _this.getPictures.bind(_this);
    _this.onSelectPicture = _this.onSelectAPicture.bind(_this);
    _this.autoWaterMark = _this.autoWaterMark.bind(_this);
    _this.chooseWaterMake = _this.chooseWaterMake.bind(_this);
    _this.chooseWaterMakePosition = _this.chooseWaterMakePosition.bind(_this);
    _this.onAutoSizeChange = _this.onAutoSizeChange.bind(_this);

    _this.getPfop = _this.getPfop.bind(_this);
    _this.getPfopPictures = _this.getPfopPictures.bind(_this);
    return _this;
  }