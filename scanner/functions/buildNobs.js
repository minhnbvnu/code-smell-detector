function buildNobs(data, scope, coord) {
  var nobs = coord.append('g').attr('class', 'nobs')
    .selectAll('.nob').data(data || []).enter()
      .append('g').attr('class', 'nob')
  var circle = nobs.append('circle').attr('class', 'nob').attr('r', 20)
  function loop(g) {
    g.transition()
    .duration(1000)
    .ease('ease-out')
    .attr({r: 25})
    .style({fill: 'rgba(0, 0, 0, 0.2)'})
    .transition()
    .ease('ease-in')
    .duration(1000)
    .attr({r: 20})
    .style({fill: 'rgba(0, 0, 0, 0.1)'})
    .each('end', function() { return loop(d3.select(this)) })
  }
  circle.call(loop)
    .on('mousedown', function() {
      d3.selectAll('.nob').transition().each('end', null)
        .transition()
        .duration(1000)
        .ease('ease-out')
        .attr({r: 20})
        .style({fill: null})
    })
  return nobs
}