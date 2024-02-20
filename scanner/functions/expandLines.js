function expandLines(g) {
          var done = 2
          g.transition()
          .duration(dur / 2)
          .each('end', function() { if (!--done) expandPlot() })
        }