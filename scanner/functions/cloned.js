function cloned (clone) {
    rm(clone);
    atoa(clone.getElementsByTagName('*')).forEach(rm);
  }