function elementInView(el) {
      var bounds = el.getBoundingClientRect();
      return bounds.top < window.innerHeight && bounds.bottom > 0;
    }