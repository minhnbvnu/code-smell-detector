function textileDisabled(state) {
    var type = state.layoutType;

    switch(type) {
    case "notextile":
    case "code":
    case "pre":
      return TOKEN_STYLES[type];
    default:
      if (state.notextile)
        return TOKEN_STYLES.notextile + (type ? (" " + TOKEN_STYLES[type]) : "");
      return null;
    }
  }