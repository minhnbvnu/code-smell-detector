function getParentHistoryObj(scope) {
    var parentScope = scope;
    while (parentScope) {
      if (parentScope.hasOwnProperty('$historyId')) {
        // this parent scope has a historyId
        return { historyId: parentScope.$historyId, scope: parentScope };
      }
      // nothing found keep climbing up
      parentScope = parentScope.$parent;
    }
    // no history for the parent, use the root
    return { historyId: 'root', scope: $rootScope };
  }