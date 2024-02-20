function basisVectorData() {
  return [
    {
      p1: function(o) { return o.opt.pixel([0, 0]) },
      p2: function(o) { return o.opt.pixel(o.opt.basis1) },
      style: function(g) {
        g.style('stroke', color.primary).call(vectorStyle)
      },
      head: 'primary'
    }, {
      p1: function(o) { return o.opt.pixel([0, 0]) },
      p2: function(o) { return o.opt.pixel(o.opt.basis2) },
      style: function(g) {
        g.style('stroke', color.secondary).call(vectorStyle)
      },
      head: 'secondary'
    }
  ]
}