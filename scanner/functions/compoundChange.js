function compoundChange(f) {
      history.startCompound();
      try { return f(); } finally { history.endCompound(); }
    }