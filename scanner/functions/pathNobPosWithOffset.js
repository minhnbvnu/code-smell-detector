function pathNobPosWithOffset(g, basis, idx) {
      return function(o) {
        var el = g.node()
        var l = el.getTotalLength()
        var p1 = vector(el.getPointAtLength(l * 0.49))
        var p2 = vector(el.getPointAtLength(l * 0.50))
        var p3 = vector(el.getPointAtLength(l * 0.51))
        var normal = p3.sub(p1).rot(pi / 2)
        var offset = wScale(o[basis][idx])
        if (normal.len() > 0) normal = normal.unit().scale(offset)
        return p2.add(normal).array()
      }
    }