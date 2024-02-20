function SelectionBox(props) {
	        (0, _classCallCheck3['default'])(this, SelectionBox);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (SelectionBox.__proto__ || Object.getPrototypeOf(SelectionBox)).call(this, props));

	        _this.state = {
	            checked: _this.getCheckState(props)
	        };
	        return _this;
	    }