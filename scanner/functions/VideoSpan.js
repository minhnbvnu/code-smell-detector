function VideoSpan(props) {
    _classCallCheck(this, VideoSpan);

    var _this = _possibleConstructorReturn(this, (VideoSpan.__proto__ || Object.getPrototypeOf(VideoSpan)).call(this, props));

    var entity = _draftJs.Entity.get(_this.props.entityKey);

    var _entity$getData = entity.getData(),
        width = _entity$getData.width,
        height = _entity$getData.height;

    _this.state = {
      width: width,
      height: height
    };
    return _this;
  }