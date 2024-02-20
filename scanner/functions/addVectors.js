function addVectors(g, data) {
  if (g.select('.vectors').node())
    throw new Error('vectors group already exists on g')
  var vectors = g.append('g').attr('class', 'vectors')
    .selectAll('g.vector').data(data)
      .enter().append('g').attr('class', 'vector')

  vectors.append('line')
    .attr({
      'marker-end': function(d) {
        return d.head === false ? null : 'url(#vector-head-' + d.style + ')'
      }
      , 'class': function(d) { return d.name }
      , stroke: function(d) { return d.stroke || color[d.style] }
      , 'stroke-dasharray': function(d) { return d.dash }
      , 'stroke-width': function(d) { return d['stroke-width'] }
      , opacity: function(d) { return d.opacity }
    })
  return vectors
}