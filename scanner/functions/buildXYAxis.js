function buildXYAxis() {
      xAxis = d3.svg.axis().scale(x).tickValues(thetas)
        .tickFormat(function(d) {
          return d3.round(d / pi * 10) / 10 + 'π'
        }).tickSize(4)

      xAxisG = baseAxis.append('g').attr('class', 'x-axis axis')
        .attr('transform', 'translate(' + [0, y.range()[0] + h / 2 ] + ')')
        .call(xAxis)

      yAxis = d3.svg.axis().scale(y).orient('left').ticks(4)
        .innerTickSize(-w + m.l + m.r)
        .outerTickSize(0)

      yAxisG = baseAxis.append('g')
        .attr('transform', 'translate(' + [m.l, h / 2] + ')')

      yAxisG.append('g').attr('class', 'y-axis axis')
        .call(yAxis)

      axisZero = yAxisG
        .append('line')
        .attr('class', 'axis-zero')
        .attr({x1: 0, y1: round(y(0)), x2: w - m.l - m.r, y2: round(y(0)) })

      sinPath = stage.append('path').attr('class', 'sin-path')
      cosPath = stage.append('path').attr('class', 'cos-path')
    }