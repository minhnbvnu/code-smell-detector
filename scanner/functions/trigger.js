function trigger() {
      if (fired) return;
      fired = true;
      fn();
    }