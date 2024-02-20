function clampPlot(p) {
      var _x = p[0], _y = p[1]
      if ( _x < x.range()[0] )    _x =  x.range()[0]
      else if (_x > x.range()[1]) _x =  x.range()[1]
      if ( _y < y.range()[1] )    _y =  y.range()[1]
      else if (_y > y.range()[0]) _y =  y.range()[0]
      return [_x, _y]
    }