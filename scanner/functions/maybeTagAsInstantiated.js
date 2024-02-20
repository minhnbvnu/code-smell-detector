function maybeTagAsInstantiated(node, fn) {
    var score = fn.instantiateScore;

    if (!cx.disabledComputing && score && fn.args.length && nodeSmallerThan(node, score * 5)) {
      maybeInstantiate(functionScope(fn.originNode.scope.prev), score / 2);
      setFunctionInstantiated(node, fn);
      return true;
    } else {
      fn.instantiateScore = null;
    }
  }