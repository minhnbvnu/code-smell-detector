function computeDeepStateStatus(state) {
    var name = state.name;
    if (deepStateRedirectsByName.hasOwnProperty(name))
      return deepStateRedirectsByName[name];
    recordDeepStateRedirectStatus(name);
  }