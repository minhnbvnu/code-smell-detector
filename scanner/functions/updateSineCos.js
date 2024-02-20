function updateSineCos(radius) {
      var n = 100, vals, x, y

      // Show sine.
      vals = d3.range(n).map(function(i) {
        x = pi * 2 / (n - 1) * i
        return [ thetaScale(x), yScaleTrig(sin(x) * radius) ]
      })
      x = thetaScale(theta), y = yScaleTrig(sin(theta) * radius)
      sinPath.attr('class', 'sin').attr('d', 'M' + vals.join('L'))
      sineArm.attr({ x1: thetaScale(theta), y1: 0, x2: x, y2: y })
      sineNob.attr('transform', 'translate(' + [x, y] + ')')

      // Show cosine.
      vals = d3.range(n).map(function(i) {
        x = pi * 2 / (n - 1) * i
        return [ thetaScale(x), yScaleTrig(cos(x) * radius) ]
      })
      cosPath.attr('class', 'cos').attr('d', 'M' + vals.join('L'))
      x = thetaScale(theta), y = yScaleTrig(cos(theta) * radius)
      coseArm.attr({ x1: thetaScale(theta), y1: 0, x2: x, y2: y })
      cosineNob.attr('transform', 'translate(' + [x, y] + ')')
    }