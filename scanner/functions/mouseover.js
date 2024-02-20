function mouseover(d) {
      var p = d3.mouse(this)
      var px = scope.d1SelPixel
      var j = Math.floor(p[0] / pw)
      var i = Math.floor(p[1] / ph)
      if (i >= ih) return
      if (j >= iw) {
        j = Math.floor((p[0] - 616) / pw)
        if (j >= iw || j < 0) return
      }
      // no change!
      if (px[0] === i && px[1] === j) return
      scope.$apply(function() { scope.d1SelPixel = [i, j] })
    }