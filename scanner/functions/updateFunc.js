function updateFunc(g, func) {
      var xDomain = xScale.domain()[1]
      var vals = d3.range(n).map(function(d) { return d / (n - 1) * xDomain })
      g.attr('d', 'M' + vals
        .map(function(d) { return [xScale(d), yScale(func(d))] })
        .join('L'))
    }