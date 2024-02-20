function styleAxisLabels(g) {
    g.style('text-anchor', 'middle')
     .each(function(d) { d.style(d3.select(this)) })
  }