function drawRegular(data) {
      var rw = 1, rh = rw, tf = h / 2 - ih / 2 * rh, lf = w - 32 - 60
      ctx.clearRect(lf, tf, rw, rh)
      for(var i = 0; i < data.length; i++) {
        ctx.fillStyle = 'rgb(' + [data[i], data[i], data[i]] + ')'
        ctx.fillRect( (i % iw) * rw + lf, Math.floor(i / ih) * rh + tf, rw, rh)
      }
    }