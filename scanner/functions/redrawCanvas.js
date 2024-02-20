function redrawCanvas() {
      ctx.clearRect(0, 0, w, h)
      nodes.forEach(function(d) {
        var r = 4
        if(d.style === 'tertiary') return
        ctx.beginPath()
        ctx.fillStyle = fillStyles[d.style]
        ctx.arc(d.x, d.y, r, 0, tau)
        ctx.fill()
        // ctx.fillText(d.index, d.x, d.y)
      })
    }