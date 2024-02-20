function AutoComplete() {
	        (0, _classCallCheck3['default'])(this, AutoComplete);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).apply(this, arguments));

	        _this.getInputElement = function () {
	            var children = _this.props.children;

	            var element = children && _react2['default'].isValidElement(children) && children.type !== _rcSelect.Option ? _react2['default'].Children.only(_this.props.children) : _react2['default'].createElement(_input2['default'], null);
	            var elementProps = (0, _extends3['default'])({}, element.props);
	            // https://github.com/ant-design/ant-design/pull/7742
	            delete elementProps.children;
	            return _react2['default'].createElement(
	                _InputElement2['default'],
	                elementProps,
	                element
	            );
	        };
	        return _this;
	    }