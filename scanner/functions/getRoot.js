function getRoot(d) {
      if(d.parent) {
        return getRoot(d.parent);
      }
      return d;
    }