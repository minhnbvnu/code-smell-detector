function buidUnitCircle(g) {
      g.classed('unit-circle', true)
      var rot = g.append('g').attr('class', 'rot')
      rot.append('g').attr('class', 'x-unit-axis axis').call(unitXAxis)
      rot.append('g').attr('class', 'y-unit-axis axis').call(unitYAxis)

      rot.append('circle').attr('r', unitX(1))

      rot.append('line')
        .classed('cos-arm', true)
        .attr({x1: 0, y1: 0})
        .attr('y2', 0)

      rot.append('line')
        .classed('sin-arm', true)
        .attr({x1: 0, y1: 0})
        .attr('x2', 0)

      rot.append('line').classed('ray-arm', true).attr({x1: 0, y1: 0})

      rot.append('path').classed('triangle', true)
      rot.append('circle').classed('center', true).attr('r', 3)
      rot.append('circle').classed('nob', true).attr('r', 3)
      g.append('text').attr('y', rInPixels + 20)
    }