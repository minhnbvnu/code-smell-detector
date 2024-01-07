function getConditionalAnnotation(path, name) {
	  var ifStatement = getParentConditionalPath(path);
	  if (!ifStatement) return;

	  var test = ifStatement.get("test");
	  var paths = [test];
	  var types = [];

	  do {
	    var _path = paths.shift().resolve();

	    if (_path.isLogicalExpression()) {
	      paths.push(_path.get("left"));
	      paths.push(_path.get("right"));
	    }

	    if (_path.isBinaryExpression()) {
	      var type = inferAnnotationFromBinaryExpression(name, _path);
	      if (type) types.push(type);
	    }
	  } while (paths.length);

	  if (types.length) {
	    return {
	      typeAnnotation: t.createUnionTypeAnnotation(types),
	      ifStatement: ifStatement
	    };
	  } else {
	    return getConditionalAnnotation(ifStatement, name);
	  }
	}