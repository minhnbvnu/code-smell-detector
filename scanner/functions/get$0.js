function get$0() {
      //return a PImage of curContext
      var c = new PImage(p.width, p.height, PConstants.RGB);
      c.fromImageData(curContext.getImageData(0, 0, p.width, p.height));
      return c;
    }