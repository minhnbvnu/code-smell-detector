function Pagination(props) {
	    (0, _classCallCheck3['default'])(this, Pagination);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

	    _initialiseProps.call(_this);

	    var hasOnChange = props.onChange !== noop;
	    var hasCurrent = 'current' in props;
	    if (hasCurrent && !hasOnChange) {
	      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.'); // eslint-disable-line
	    }

	    var current = props.defaultCurrent;
	    if ('current' in props) {
	      current = props.current;
	    }

	    var pageSize = props.defaultPageSize;
	    if ('pageSize' in props) {
	      pageSize = props.pageSize;
	    }

	    _this.state = {
	      current: current,
	      currentInputValue: current,
	      pageSize: pageSize
	    };
	    return _this;
	  }