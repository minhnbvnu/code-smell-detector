function drop_first(open, close) {
    switch (open+" "+close) {
      case "when ->":       return true;
      case "-> end":        return true;
      case "-> .":          return true;
      case ". .":           return true;
      default:              return false;
    }
  }