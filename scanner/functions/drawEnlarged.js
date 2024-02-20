function drawEnlarged(data, xoff, yoff, r, g, b) {
      var pw = 12, color
      ctx.clearRect(xoff, yoff, pw, ph)
      for(var i = 0; i < data.length; i++) {
        var color = [ r ? data[i] : 0, g ? data[i] : 0, b ? data[i] : 0 ]
        if (data[i] === undefined) ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        else ctx.fillStyle = 'rgb(' + color + ')'
        ctx.fillRect( (i % iw) * pw + xoff, Math.floor(i / ih) * ph + yoff, pw, ph)
      }
    }