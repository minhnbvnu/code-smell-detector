function isWithRadius(r, d) {
      var x = d.x - xOffset - maxRadius
      var y = d.y - maxRadius
      return Math.sqrt(x * x + y * y) < r
    }