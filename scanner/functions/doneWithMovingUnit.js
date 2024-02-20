function doneWithMovingUnit() {
      movingUnit.remove()
      var dur = 3000
      unitCircles.call(function(g) {
        g.selectAll('circle')
          .transition()
          .duration(dur)
          .style('opacity', 0)
        g.selectAll('.axis').transition().duration(dur).style('opacity', 0)
        g.selectAll('.ray-arm').transition().duration(dur).style('opacity', 0)
        g.selectAll('.triangle').transition().duration(dur).style('opacity', 0)
        if (isCosine) g.select('.rot')
          .transition()
          .delay(dur / 2)
          .duration(dur / 2)
          .attr('transform', function(d) { return 'rotate(-90)' })
          .call(expandLines)
        else g.call(expandLines)
        function expandLines(g) {
          var done = 2
          g.transition()
          .duration(dur / 2)
          .each('end', function() { if (!--done) expandPlot() })
        }
        g.selectAll('text').transition().duration(dur).style('opacity', 0)
        baseAxis.transition().duration(dur).style('opacity', 1)
      })
    }