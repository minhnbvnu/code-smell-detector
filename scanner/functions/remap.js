function remap(path, key) {
	  var shadowPath = path.inShadow(key);
	  if (!shouldShadow(path, shadowPath)) return;

	  var shadowFunction = path.node._shadowedFunctionLiteral;

	  var currentFunction = void 0;
	  var passedShadowFunction = false;

	  var fnPath = path.find(function (innerPath) {
	    if (innerPath.parentPath && innerPath.parentPath.isClassProperty() && innerPath.key === "value") {
	      return true;
	    }
	    if (path === innerPath) return false;
	    if (innerPath.isProgram() || innerPath.isFunction()) {
	      currentFunction = currentFunction || innerPath;
	    }

	    if (innerPath.isProgram()) {
	      passedShadowFunction = true;

	      return true;
	    } else if (innerPath.isFunction() && !innerPath.isArrowFunctionExpression()) {
	      if (shadowFunction) {
	        if (innerPath === shadowFunction || innerPath.node === shadowFunction.node) return true;
	      } else {
	        if (!innerPath.is("shadow")) return true;
	      }

	      passedShadowFunction = true;
	      return false;
	    }

	    return false;
	  });

	  if (shadowFunction && fnPath.isProgram() && !shadowFunction.isProgram()) {
	    fnPath = path.findParent(function (p) {
	      return p.isProgram() || p.isFunction();
	    });
	  }

	  if (fnPath === currentFunction) return;

	  if (!passedShadowFunction) return;

	  var cached = fnPath.getData(key);
	  if (cached) return path.replaceWith(cached);

	  var id = path.scope.generateUidIdentifier(key);

	  fnPath.setData(key, id);

	  var classPath = fnPath.findParent(function (p) {
	    return p.isClass();
	  });
	  var hasSuperClass = !!(classPath && classPath.node && classPath.node.superClass);

	  if (key === "this" && fnPath.isMethod({ kind: "constructor" }) && hasSuperClass) {
	    fnPath.scope.push({ id: id });

	    fnPath.traverse(superVisitor, { id: id });
	  } else {
	    var init = key === "this" ? t.thisExpression() : t.identifier(key);

	    if (shadowFunction) init._shadowedFunctionLiteral = shadowFunction;

	    fnPath.scope.push({ id: id, init: init });
	  }

	  return path.replaceWith(id);
	}