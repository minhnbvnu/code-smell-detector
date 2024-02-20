function addCallbacks (basicStates) {
  angular.forEach(basicStates, function (state) {
    function deregisterView(state, cause) {
      var views = _.keys(state.$$state().views);
      tLog.views = _.difference(tLog.views, views);
//      console.log(cause + ":Deregistered Inactive view " + views + " for state " + state.name + ": ", tLog.views);
    }
    function registerView(state, cause) {
      var views = _.keys(state.$$state().views);
      tLog.views = _.union(tLog.views, views);
//      console.log(cause  + ":  Registered Inactive view " + views + " for state " + state.name + ": ", tLog.views);
    }

    state.onInactivate = function () {
      tLog.inactivated.push(state.name); registerView(state,  'Inactivate');
    };
    state.onReactivate = function () {
      tLog.reactivated.push(state.name); deregisterView(state,'Reactivate');
    };
    state.onEnter = function () {
      tLog.entered.push(state.name);     deregisterView(state,'Enter     ');
    };
    state.onExit = function () {
      tLog.exited.push(state.name);      deregisterView(state,'Exit      ');
    };
  });
}