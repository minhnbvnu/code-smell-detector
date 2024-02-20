function derivedState(opts) {
      var o = {}
      Object.keys(opts).forEach(function(key) { o[key] = opts[key] }) // Extend
      o.states = matrix([
        [ o.basis1[0], o.basis2[0] ],
        [ o.basis1[1], o.basis2[1] ]
      ])
      o.eigens = o.states.eigenVectors().map(vector)
      var m = max(o.eigens[0].len(), o.eigens[1].len())
      o.eigens = o.eigens.map(function(e) { return e.scale(1 / m) })
      opts.samples = o.samples
      return o
    }