function SelectionCheckboxAll(props) {
	        (0, _classCallCheck3['default'])(this, SelectionCheckboxAll);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (SelectionCheckboxAll.__proto__ || Object.getPrototypeOf(SelectionCheckboxAll)).call(this, props));

	        _this.handleSelectAllChagne = function (e) {
	            var checked = e.target.checked;
	            _this.props.onSelect(checked ? 'all' : 'removeAll', 0, null);
	        };
	        _this.defaultSelections = props.hideDefaultSelections ? [] : [{
	            key: 'all',
	            text: props.locale.selectAll,
	            onSelect: function onSelect() {}
	        }, {
	            key: 'invert',
	            text: props.locale.selectInvert,
	            onSelect: function onSelect() {}
	        }];
	        _this.state = {
	            checked: _this.getCheckState(props),
	            indeterminate: _this.getIndeterminateState(props)
	        };
	        return _this;
	    }