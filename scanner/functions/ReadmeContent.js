function ReadmeContent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ReadmeContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ReadmeContent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      withPreview: true
    };
    _this.ref = null;

    _this.handleRef = function (ref) {
      _this.ref = ref;

      _this.highlight();
    };

    _this.notifyParent = function () {
      _this.setState({
        withPreview: false
      });
    };

    return _this;
  }