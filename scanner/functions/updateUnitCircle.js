function updateUnitCircle(g) {
      g.select('.ray-arm')
        .attr('x2', function(d) { return unitX(cos(d)) })
        .attr('y2', function(d) { return unitY(sin(d)) })
      g.select('.cos-arm')
        .attr('x2', function(d) { return unitX(cos(d)) })
      g.select('.sin-arm')
        .attr('y2', function(d) { return unitY(sin(d)) })
      g.select('text').text(function(d) {
        return d3.round(d / pi * 10) / 10 + 'π'
      })
      g.select('.nob')
        .attr('cx', function(d) { return unitX(cos(d)) })
        .attr('cy', function(d) { return unitY(sin(d)) })
      g.select('.triangle').attr('d', function(d) {
        var x = unitX(cos(d)), y = unitY(sin(d))
          return 'M 0,0 L ' + (isCosine ? [x, 0] : [0, y]) + ' L ' + [x, y]
      })
    }