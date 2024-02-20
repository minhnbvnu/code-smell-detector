function TransferList(props) {
	        (0, _classCallCheck3['default'])(this, TransferList);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (TransferList.__proto__ || Object.getPrototypeOf(TransferList)).call(this, props));

	        _this.handleSelect = function (selectedItem) {
	            var checkedKeys = _this.props.checkedKeys;

	            var result = checkedKeys.some(function (key) {
	                return key === selectedItem.key;
	            });
	            _this.props.handleSelect(selectedItem, !result);
	        };
	        _this.handleFilter = function (e) {
	            _this.props.handleFilter(e);
	            if (!e.target.value) {
	                return;
	            }
	            // Manually trigger scroll event for lazy search bug
	            // https://github.com/ant-design/ant-design/issues/5631
	            _this.triggerScrollTimer = setTimeout(function () {
	                var listNode = (0, _reactDom.findDOMNode)(_this).querySelectorAll('.ant-transfer-list-content')[0];
	                if (listNode) {
	                    (0, _triggerEvent2['default'])(listNode, 'scroll');
	                }
	            }, 0);
	        };
	        _this.handleClear = function () {
	            _this.props.handleClear();
	        };
	        _this.matchFilter = function (text, item) {
	            var _this$props = _this.props,
	                filter = _this$props.filter,
	                filterOption = _this$props.filterOption;

	            if (filterOption) {
	                return filterOption(filter, item);
	            }
	            return text.indexOf(filter) >= 0;
	        };
	        _this.renderItem = function (item) {
	            var _this$props$render = _this.props.render,
	                render = _this$props$render === undefined ? noop : _this$props$render;

	            var renderResult = render(item);
	            var isRenderResultPlain = isRenderResultPlainObject(renderResult);
	            return {
	                renderedText: isRenderResultPlain ? renderResult.value : renderResult,
	                renderedEl: isRenderResultPlain ? renderResult.label : renderResult
	            };
	        };
	        _this.state = {
	            mounted: false
	        };
	        return _this;
	    }