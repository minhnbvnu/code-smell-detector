function ResponseBody() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, ResponseBody);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ResponseBody.__proto__ || (0, _getPrototypeOf2.default)(ResponseBody)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                    parsedContent: null
                }, _this.updateParsedContent = function(prevContent) {
                    var content = _this.props.content;
                    if (prevContent === content) {
                        return
                    }
                    if (content && content instanceof Blob) {
                        var reader = new FileReader;
                        reader.onload = function() {
                            _this.setState({
                                parsedContent: reader.result
                            })
                        };
                        reader.readAsText(content)
                    } else {
                        _this.setState({
                            parsedContent: content.toString()
                        })
                    }
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }