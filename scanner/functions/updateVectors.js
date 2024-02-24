function updateVectors(vectors, o) {
  vectors.select('line')
    .each(function(d) { d._p1 = d.p1(o), d._p2 = d.p2(o) })
    .attr({
        x1: function(d) { return d._p1[0] }
      , y1: function(d) { return d._p1[1] }
      , x2: function(d) { return d._p2[0] }
      , y2: function(d) { return d._p2[1] }
    })
}