function drawCrossArrow(g, p1, p2, thickness, style) {
      var r1 = scope.opts.sample[style === 'primary' ? 0 : 1]
      var r2 = scope.opts.sample[style === 'primary' ? 1 : 0]
      var rScale = scope.opts.rScale
      p1 = vector(p1), p2 = vector(p2)
      var diff = p2.sub(p1).unit()
      var theta = pi * 0.25, rP = 90
      var unit = diff.rot(-theta)
      var p11 = unit.scale(rScale(r1)).add(p1)
      var p12 = unit.scale(rScale(r1) + rP).add(p1)
      unit = diff.rot(theta - pi)
      var p21 = unit.scale(rScale(r2) + rP).add(p2)
      var p22 = unit.scale(rScale(r2)).add(p2)
      g.attr('marker-end', 'url(#sf-to-ny-marker-' + style + ')')
        .attr('class', 'arrow')
        .attr('d', 'M' + p11 + 'C' + p12 + ' ' + p21 + ' ' + p22)
        .style('stroke', color[style])
        .style('stroke-width', thickness)
    }