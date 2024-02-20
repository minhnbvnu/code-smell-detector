function redrawSamples() {
      pointsX.attr('transform', function(d) {
        return 'translate(' + [x(d.c[0]), 0] + ')'
      })
      pointsY.attr('transform', function(d) {
        return 'translate(' + [x(d.c[1]), 0] + ')'
      })
      pointsPC1.data(scope.pcaSamples).attr('transform', function(d) {
        return 'translate(' + [xPC(d[0]), 0] + ')'
      })
      pointsPC2.data(scope.pcaSamples).attr('transform', function(d) {
        return 'translate(' + [xPC(d[1]), 0] + ')'
      })
    }