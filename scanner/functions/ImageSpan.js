function ImageSpan(props) {
    _classCallCheck(this, ImageSpan);

    var _this = _possibleConstructorReturn(this, (ImageSpan.__proto__ || Object.getPrototypeOf(ImageSpan)).call(this, props));

    var entity = _draftJs.Entity.get(_this.props.entityKey);

    var _entity$getData = entity.getData(),
        width = _entity$getData.width,
        height = _entity$getData.height;

    _this.state = {
      width: width,
      height: height,
      imageSrc: ''
    };
    _this.onImageClick = _this._onImageClick.bind(_this);
    _this.onDoubleClick = _this._onDoubleClick.bind(_this);
    return _this;
  }