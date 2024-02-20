function findPatientZero() {
        var cur = null, curR
        // find the center most node for patient zero.
        nodes.forEach(function(d) {
          var x = d.x - xOffset - ( w - m.t - m.b ) / 4, y = d.y - h / 2
          var r = Math.sqrt(x * x + y * y)
          if (!cur || curR > r) curR = r, cur = d
        })
        return cur
      }