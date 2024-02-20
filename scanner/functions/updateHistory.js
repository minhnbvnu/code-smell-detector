function updateHistory() {
      var xa = function(d) { return x(d.i) }
      var sel = valuesG.selectAll('line').data(history)
      sel.exit().remove()
      sel.enter()
        .append('line')
        .style('stroke', function(d) { return colorScale(d.i / maxGenerationGuess * 0.7) })
        .attr({y1: y(0), y2: y(0), x1: xa, x2: xa})
        .transition()
        .attr({y1: y(0), y2: function(d) { return y(d.d) }, x1: xa, x2: xa})
      sel = labelsG.selectAll('text').data(history)
      sel.exit().remove()
      sel.enter()
        .append('text')
        .attr({x: xa, y: y(0) + 15 })
        .style('text-anchor', 'middle')
        .style('font-size', 12 + 'px')
        .text(function(d) { return d.i; })
    }