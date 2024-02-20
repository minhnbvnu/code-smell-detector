function drawNodes() {
      ctx.lineWidth = 0
      nodes.forEach(function(d) {
        if (!d.visible) return
        ctx.beginPath()
        ctx.fillStyle = d.generation === -1
          ? color2 : colorScale(d.generation / maxGenerationGuess * 0.7)
        ctx.arc(d.x + m.l, d.y + m.t, d.generation === -1 ? r / 3 : r / 2.5, 0, 2 * Math.PI)
        ctx.fill()
        if (d.generation !== -1) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.fillText(d.generation, d.x + m.l, d.y + m.t + 4)
        }
      })
    }