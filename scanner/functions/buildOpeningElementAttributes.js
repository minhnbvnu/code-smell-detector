function buildOpeningElementAttributes(attribs, file) {
	    var _props = [];
	    var objs = [];

	    var useBuiltIns = file.opts.useBuiltIns || false;
	    if (typeof useBuiltIns !== "boolean") {
	      throw new Error("transform-react-jsx currently only accepts a boolean option for " + "useBuiltIns (defaults to false)");
	    }

	    function pushProps() {
	      if (!_props.length) return;

	      objs.push(t.objectExpression(_props));
	      _props = [];
	    }

	    while (attribs.length) {
	      var prop = attribs.shift();
	      if (t.isJSXSpreadAttribute(prop)) {
	        pushProps();
	        objs.push(prop.argument);
	      } else {
	        _props.push(convertAttribute(prop));
	      }
	    }

	    pushProps();

	    if (objs.length === 1) {
	      attribs = objs[0];
	    } else {
	      if (!t.isObjectExpression(objs[0])) {
	        objs.unshift(t.objectExpression([]));
	      }

	      var helper = useBuiltIns ? t.memberExpression(t.identifier("Object"), t.identifier("assign")) : file.addHelper("extends");

	      attribs = t.callExpression(helper, objs);
	    }

	    return attribs;
	  }