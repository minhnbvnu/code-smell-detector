function pushProps() {
	      if (!_props.length) return;

	      objs.push(t.objectExpression(_props));
	      _props = [];
	    }