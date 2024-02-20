function pathNobSetFromPos(g, basis, idx) {
      return function(scope, p) {
        var el = g.node()
        var l = el.getTotalLength()
        var p1 = vector(el.getPointAtLength(l * 0.49))
        var p2 = vector(el.getPointAtLength(l * 0.50))
        var p3 = vector(el.getPointAtLength(l * 0.51))
        var tanget = p3.sub(p1)
        if (tanget.len() > 0) tanget = tanget.unit()
        else tanget = vector(1, 0)
        var rot = tanget.rot() - pi
        var m = vector(p).sub(p2).rot(-rot)
        m.x = 0
        if (m.y > 0) m.y = 0
        scope.opts[basis][idx] = wScale.invert(m.len())
        scope.opts[basis][1 - idx] = 1 - scope.opts[basis][idx]
      }
    }