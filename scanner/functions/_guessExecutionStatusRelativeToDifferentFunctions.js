function _guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent) {
	  var targetFuncPath = targetFuncParent.path;
	  if (!targetFuncPath.isFunctionDeclaration()) return;

	  var binding = targetFuncPath.scope.getBinding(targetFuncPath.node.id.name);

	  if (!binding.references) return "before";

	  var referencePaths = binding.referencePaths;

	  for (var _iterator = referencePaths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var path = _ref;

	    if (path.key !== "callee" || !path.parentPath.isCallExpression()) {
	      return;
	    }
	  }

	  var allStatus = void 0;

	  for (var _iterator2 = referencePaths, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	    var _ref2;

	    if (_isArray2) {
	      if (_i2 >= _iterator2.length) break;
	      _ref2 = _iterator2[_i2++];
	    } else {
	      _i2 = _iterator2.next();
	      if (_i2.done) break;
	      _ref2 = _i2.value;
	    }

	    var _path = _ref2;

	    var childOfFunction = !!_path.find(function (path) {
	      return path.node === targetFuncPath.node;
	    });
	    if (childOfFunction) continue;

	    var status = this._guessExecutionStatusRelativeTo(_path);

	    if (allStatus) {
	      if (allStatus !== status) return;
	    } else {
	      allStatus = status;
	    }
	  }

	  return allStatus;
	}