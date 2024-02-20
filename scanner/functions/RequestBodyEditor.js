function RequestBodyEditor(props, context) {
                (0, _classCallCheck3.default)(this, RequestBodyEditor);
                var _this = (0, _possibleConstructorReturn3.default)(this, (RequestBodyEditor.__proto__ || (0, _getPrototypeOf2.default)(RequestBodyEditor)).call(this, props, context));
                _this.setValueToSample = function(explicitMediaType) {
                    _this.onChange(_this.sample(explicitMediaType))
                };
                _this.resetValueToSample = function(explicitMediaType) {
                    _this.setState({
                        userDidModify: false
                    });
                    _this.setValueToSample(explicitMediaType)
                };
                _this.sample = function(explicitMediaType) {
                    var _this$props = _this.props,
                        requestBody = _this$props.requestBody,
                        mediaType = _this$props.mediaType;
                    var mediaTypeValue = requestBody.getIn(["content", explicitMediaType || mediaType]);
                    var schema = mediaTypeValue.get("schema").toJS();
                    var mediaTypeExample = mediaTypeValue.get("example") !== undefined ? (0, _utils.stringify)(mediaTypeValue.get("example")) : null;
                    return mediaTypeExample || (0, _utils.getSampleSchema)(schema, explicitMediaType || mediaType, {
                        includeWriteOnly: true
                    })
                };
                _this.onChange = function(value) {
                    _this.setState({
                        value: value
                    });
                    _this.props.onChange(value)
                };
                _this.handleOnChange = function(e) {
                    var mediaType = _this.props.mediaType;
                    var isJson = /json/i.test(mediaType);
                    var inputValue = isJson ? e.target.value.trim() : e.target.value;
                    _this.setState({
                        userDidModify: true
                    });
                    _this.onChange(inputValue)
                };
                _this.toggleIsEditBox = function() {
                    return _this.setState(function(state) {
                        return {
                            isEditBox: !state.isEditBox
                        }
                    })
                };
                _this.state = {
                    isEditBox: false,
                    userDidModify: false,
                    value: ""
                };
                return _this
            }