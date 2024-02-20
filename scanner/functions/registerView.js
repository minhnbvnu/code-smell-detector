function registerView(state, cause) {
      var views = _.keys(state.$$state().views);
      tLog.views = _.union(tLog.views, views);
//      console.log(cause  + ":  Registered Inactive view " + views + " for state " + state.name + ": ", tLog.views);
    }