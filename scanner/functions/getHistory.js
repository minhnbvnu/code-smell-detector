function getHistory(scope) {
    var histObj = getParentHistoryObj(scope);

    if (!viewHistory.histories[ histObj.historyId ]) {
      // this history object exists in parent scope, but doesn't
      // exist in the history data yet
      viewHistory.histories[ histObj.historyId ] = {
        historyId: histObj.historyId,
        parentHistoryId: getParentHistoryObj(histObj.scope.$parent).historyId,
        stack: [],
        cursor: -1
      };
    }
    return getHistoryById(histObj.historyId);
  }