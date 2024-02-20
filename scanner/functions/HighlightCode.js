function HighlightCode() {
                var _ref;
                var _temp, _this, _ret;
                (0, _classCallCheck3.default)(this, HighlightCode);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HighlightCode.__proto__ || (0, _getPrototypeOf2.default)(HighlightCode)).call.apply(_ref, [this].concat(args))), _this), _this.initializeComponent = function(c) {
                    _this.el = c
                }, _this.downloadText = function() {
                    (0, _jsFileDownload2.default)(_this.props.value, _this.props.fileName || "response.txt")
                }, _this.preventYScrollingBeyondElement = function(e) {
                    var target = e.target;
                    var deltaY = e.nativeEvent.deltaY;
                    var contentHeight = target.scrollHeight;
                    var visibleHeight = target.offsetHeight;
                    var scrollTop = target.scrollTop;
                    var scrollOffset = visibleHeight + scrollTop;
                    var isElementScrollable = contentHeight > visibleHeight;
                    var isScrollingPastTop = scrollTop === 0 && deltaY < 0;
                    var isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0;
                    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
                        e.preventDefault()
                    }
                }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret)
            }