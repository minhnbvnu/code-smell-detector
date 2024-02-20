function suppressKeyEvent(e) {
      if (typeof e.preventDefault === "function") e.preventDefault();
      else if (typeof e.stopPropagation === "function") e.stopPropagation();
      return false
    }