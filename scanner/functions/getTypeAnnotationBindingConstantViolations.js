function getTypeAnnotationBindingConstantViolations(path, name) {
	  var binding = path.scope.getBinding(name);

	  var types = [];
	  path.typeAnnotation = t.unionTypeAnnotation(types);

	  var functionConstantViolations = [];
	  var constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);

	  var testType = getConditionalAnnotation(path, name);
	  if (testType) {
	    var testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);

	    constantViolations = constantViolations.filter(function (path) {
	      return testConstantViolations.indexOf(path) < 0;
	    });

	    types.push(testType.typeAnnotation);
	  }

	  if (constantViolations.length) {
	    constantViolations = constantViolations.concat(functionConstantViolations);

	    for (var _iterator = constantViolations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var violation = _ref;

	      types.push(violation.getTypeAnnotation());
	    }
	  }

	  if (types.length) {
	    return t.createUnionTypeAnnotation(types);
	  }
	}