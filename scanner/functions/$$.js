function $$(expr, con) {
    return Array.prototype.slice.call((con || document).querySelectorAll(expr));
  }