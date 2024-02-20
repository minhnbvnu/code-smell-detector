function drawEnlargedText(data) {
      var rw = 12, rh = rw, tf = h / 2 - ih / 2 * rh, lf = 10
      var tx = rh / 2, ty = rw / 2 + 2
      ctx.clearRect(lf, tf, iw * rw, ih * rh)
      ctx.fillStyle = 'rgb(0, 0, 0, 0.7)'
      ctx.font = '5.5px sans-serif'
      ctx.textAlign = 'center'
      for(var i = 0; i < data.length; i++) {
        ctx.fillText('' + data[i], (i % iw) * rw + lf + tx, Math.floor(i / ih) * rh + tf + ty)
      }
    }