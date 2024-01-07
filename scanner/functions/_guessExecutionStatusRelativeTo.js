function _guessExecutionStatusRelativeTo(target) {
	  var targetFuncParent = target.scope.getFunctionParent();
	  var selfFuncParent = this.scope.getFunctionParent();

	  if (targetFuncParent.node !== selfFuncParent.node) {
	    var status = this._guessExecutionStatusRelativeToDifferentFunctions(targetFuncParent);
	    if (status) {
	      return status;
	    } else {
	      target = targetFuncParent.path;
	    }
	  }

	  var targetPaths = target.getAncestry();
	  if (targetPaths.indexOf(this) >= 0) return "after";

	  var selfPaths = this.getAncestry();

	  var commonPath = void 0;
	  var targetIndex = void 0;
	  var selfIndex = void 0;
	  for (selfIndex = 0; selfIndex < selfPaths.length; selfIndex++) {
	    var selfPath = selfPaths[selfIndex];
	    targetIndex = targetPaths.indexOf(selfPath);
	    if (targetIndex >= 0) {
	      commonPath = selfPath;
	      break;
	    }
	  }
	  if (!commonPath) {
	    return "before";
	  }

	  var targetRelationship = targetPaths[targetIndex - 1];
	  var selfRelationship = selfPaths[selfIndex - 1];
	  if (!targetRelationship || !selfRelationship) {
	    return "before";
	  }

	  if (targetRelationship.listKey && targetRelationship.container === selfRelationship.container) {
	    return targetRelationship.key > selfRelationship.key ? "before" : "after";
	  }

	  var targetKeyPosition = t.VISITOR_KEYS[targetRelationship.type].indexOf(targetRelationship.key);
	  var selfKeyPosition = t.VISITOR_KEYS[selfRelationship.type].indexOf(selfRelationship.key);
	  return targetKeyPosition > selfKeyPosition ? "before" : "after";
	}