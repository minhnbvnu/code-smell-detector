function d3_selection_interrupt() {
    var lock = this.__transition__;
    if (lock) ++lock.active;
  }