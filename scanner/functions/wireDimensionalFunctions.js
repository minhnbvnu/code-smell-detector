function wireDimensionalFunctions(mode) {
      if (mode === "3D") drawing = new Drawing3D;
      else if (mode === "2D") drawing = new Drawing2D;
      else drawing = new DrawingPre;
      for (var i in DrawingPre.prototype) if (DrawingPre.prototype.hasOwnProperty(i) && i.indexOf("$") < 0) p[i] = drawing[i];
      drawing.$init()
    }