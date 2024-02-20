function get$4(x, y, w, h) {
      var c = new PImage(w, h, 2);
      c.fromImageData(p.toImageData(x, y, w, h));
      return c
    }