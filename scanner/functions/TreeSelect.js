function TreeSelect(props) {
	        (0, _classCallCheck3['default'])(this, TreeSelect);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).call(this, props));

	        (0, _warning2['default'])(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
	        return _this;
	    }