function Module() {
      if (typeof this.init === "function") {
        this.init.apply(this, arguments);
      }
    }