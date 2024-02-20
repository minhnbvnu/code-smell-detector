function getKeyboardValueMutator(e) {
	  switch (e.keyCode) {
	    case _KeyCode2['default'].UP:
	    case _KeyCode2['default'].RIGHT:
	      return function (value, props) {
	        return value + props.step;
	      };

	    case _KeyCode2['default'].DOWN:
	    case _KeyCode2['default'].LEFT:
	      return function (value, props) {
	        return value - props.step;
	      };

	    case _KeyCode2['default'].END:
	      return function (value, props) {
	        return props.max;
	      };
	    case _KeyCode2['default'].HOME:
	      return function (value, props) {
	        return props.min;
	      };
	    case _KeyCode2['default'].PAGE_UP:
	      return function (value, props) {
	        return value + props.step * 2;
	      };
	    case _KeyCode2['default'].PAGE_DOWN:
	      return function (value, props) {
	        return value - props.step * 2;
	      };

	    default:
	      return undefined;
	  }
	}