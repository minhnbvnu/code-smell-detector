function checkProperties(props) {
    if (state.inES5()) {
      for (var name in props) {
        if (props[name] && props[name].setterToken && !props[name].getterToken) {
          warning("W078", props[name].setterToken);
        }
      }
    }
  }