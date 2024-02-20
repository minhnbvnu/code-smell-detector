function eigenVectorData() {
  return [{
    p1: function(o) { return o.opt.pixel([0, 0]) },
    p2: function(o) {
      return o.opt.pixel(vector(o.opt.eigenVectors[0]).unit().scale(20).array())
    },
    style: function(g, o) {
      var a = vector(o.opt.eigenVectors[0]).unit()
      var b = vector(o.opt.pos0).unit()
      var cz = abs(a.cross(b))
      g.style('stroke', o.opt.cScale(cz))
        .style('stroke-width', o.opt.opScale(cz) * 4)
        .style('opacity', o.opt.opScale(cz))
    },
    head: 'shy'
  }, {
    p1: function(o) { return o.opt.pixel([0, 0]) },
    p2: function(o) {
      return o.opt.pixel(vector(o.opt.eigenVectors[1]).unit().scale(20).array())
    },
    style: function(g, o) {
      var a = vector(o.opt.eigenVectors[1]).unit()
      var b = vector(o.opt.pos0).unit()
      var cz = abs(a.cross(b))
      g.style('stroke', o.opt.cScale(cz))
        .style('stroke-width', o.opt.opScale(cz) * 4)
        .style('opacity', o.opt.opScale(cz))
    },
    head: 'shy'
  }]
}