function fadeAncestors(d) {
      if(d.parent) {
        d.parent.fade = true;
        fadeAncestors(d.parent);
      }
    }