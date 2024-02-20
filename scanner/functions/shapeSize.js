function shapeSize (shape) {
      var s = 1;
      for (var i = 0; i < shape.length; i++) {
        s *= shape[i];
      }
      return s;
    }