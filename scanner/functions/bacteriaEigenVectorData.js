function bacteriaEigenVectorData() {
  function p2(idx) {
    return function(o) {
      return o.opt.pixel(vector(o.opt.eigenVectors[idx])
        .unit().scale(2000).array())
    }
  }
  return [
    { p1: function(o) { return o.opt.pixel([0, 0]) }, p2: p2(0) },
    { p1: function(o) { return o.opt.pixel([0, 0]) }, p2: p2(1) }
  ].map(function(d) {
    d.style = function(g, o) {
      g.style({ stroke: 'rgba(0, 0, 0, 0.1)', 'stroke-width': 8 })
    }
    d.head = 'shy'
    return d
  })
}