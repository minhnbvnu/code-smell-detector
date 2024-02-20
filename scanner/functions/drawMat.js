function drawMat(d1, pixel) {
      var data = d3.range(3 * 3).map(function(d) {
        var i = pixel[0] + Math.floor(d / 3) - 1
        var j = pixel[1] + d % 3 - 1
        if (j >= iw || i >= ih || i < 0 || j < 0) return NaN
        return d1[i * iw + j]
      })
      svgPixels.data(data)
      .style('fill', function(d) {
        if (isNaN(d)) return 'black'
        return 'rgba(' + [d, d, d, 1] + ')'
      })
      svgPixelLabels.data(data)
        .text(function(d) { return (isNaN(d)) ? '?' : d3.round(d, 2) })
        .style('fill', function(d) {
          var c = d3.round(fgColor(d3.round(isNaN(d) ? 0 : d, 2)))
          return 'rgba(' + [c, c, c, 1] + ')'
        })
      svgKernelLabels.data(scope.kernel)
        .text(function(d) { return '× ' + d })
        .style('fill', 'rgba(0, 0, 0, 1)')

      var sum = data.map(function(d, i) { return d * scope.kernel[i] })
        .reduce(function(s, c) { return s + c }, 0)
      var c = d3.round(isNaN(sum) ? 0 : sum)
      outputBlock.style('fill', 'rgb(' + [c, c, c] + ')')
      c = fgColor(c)
      outputText.text(isNaN(sum) ? '?' : Math.round(sum))
        .style('fill', 'rgba(' + [c, c, c, 1] + ')')
    }