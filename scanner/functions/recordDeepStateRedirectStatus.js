function recordDeepStateRedirectStatus(stateName) {
    var state = $state.get(stateName);
    if (!state) return false;
    var cfg = getConfig(state);
    if (cfg.dsr) {
      deepStateRedirectsByName[state.name] = REDIRECT;
      if (lastSubstate[stateName] === undefined)
        lastSubstate[stateName] = {};
    }

    var parent = state.$$state && state.$$state().parent;
    if (parent) {
      var parentStatus = recordDeepStateRedirectStatus(parent.self.name);
      if (parentStatus && deepStateRedirectsByName[state.name] === undefined) {
        deepStateRedirectsByName[state.name] = ANCESTOR_REDIRECT;
      }
    }
    return deepStateRedirectsByName[state.name] || false;
  }