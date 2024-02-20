function deregisterView(state, cause) {
      var views = _.keys(state.$$state().views);
      tLog.views = _.difference(tLog.views, views);
//      console.log(cause + ":Deregistered Inactive view " + views + " for state " + state.name + ": ", tLog.views);
    }