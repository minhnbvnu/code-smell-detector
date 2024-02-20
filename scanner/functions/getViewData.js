function getViewData(view) {
    view = view || {};
    return {
      viewId: view.viewId,
      historyId: view.historyId,
      stateId: view.stateId,
      stateName: view.stateName,
      stateParams: view.stateParams
    };
  }