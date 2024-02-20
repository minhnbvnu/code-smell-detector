function appendThetaScale(g) {
      g.append('g').attr('class', 'axis-theta axis')
      .call(d3.svg.axis().scale(thetaScale)
        .tickValues([0, pi / 2, pi, pi * 1.5, pi * 2])
        .tickFormat(function(d, i) {
          return  d3.format('.1f')(d / pi) + 'π'
        })
      )
    }