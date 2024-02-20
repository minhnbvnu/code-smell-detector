function expandPlot() {
      var dur = 2000
      y.domain([-1, 1]).range([h - m.b - 1, m.t])
      yAxisG
        .transition()
        .duration(dur)
        .attr('transform', 'translate(' + [m.l, 0] + ')')
      yAxisG.select('.y-axis')
        .transition()
        .duration(dur)
        .call(yAxis)
      xAxisG
        .transition()
        .duration(dur)
        .attr('transform', 'translate(' + [0, h - m.b] + ')')
      axisZero
        .transition()
        .duration(dur)
        .attr({x1: 0, y1: round(y(0)), x2: w - m.l - m.r, y2: round(y(0)) })
      unitCircles
        .transition()
        .duration(dur)
        .call(function(g) {
          g.select('.cos-arm')
            .attr('x2', function(theta) {
              return y(0) - y(cos(theta))
            })
          g.select('.sin-arm')
            .attr('y2', function(theta) {
              return y(sin(theta)) - y(0)
            })
        })
      setTimeout(function() {
        var n = 100
        var samples = d3.range(n).map(function(d) { return d / (n - 1) * tau })
        var path
        if (isSine) path = sinPath.attr('d', 'M ' + samples.map(function(d) {
          return [x(d), y(sin(d))]
        }).join('L'))
        if (isCosine) path = cosPath.attr('d', 'M ' + samples.map(function(d) {
          return [x(d), y(cos(d))]
        }).join('L'))
        path.style('opacity', 0)
        .transition()
        .duration(dur)
        .style('opacity', 1)
        setTimeout(function() {
          unitCircles
            .transition()
            .duration(dur)
            .style('opacity', 0)
            setTimeout(finish, dur)
        }, dur)
      }, dur)
    }