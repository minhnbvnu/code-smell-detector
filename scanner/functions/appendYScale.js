function appendYScale(g) {
      g.append('g').attr('class', 'axis-y axis')
        .call(d3.svg.axis().orient('left').scale(yScaleTrig).ticks(5))
        .attr('transform', 'translate(-20, 0)')
    }