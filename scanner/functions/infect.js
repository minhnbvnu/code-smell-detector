function infect(d) {
      patientZero = d
      visited = {}
      history = [{d: 1, i: 0}] // Patient zero!
      nodes.forEach(function(d) { d.infection = 0, d.generation = -1 })
      visited[d.id] = true
      frontier = [d]
      d.infection = 1e-6
      d.generation = 0
      drawNodes()
      var i = 0
      var durScale = d3.scale.linear().domain([1, 10]).range([3000, 100])
      duration = durScale(opts.speed)
      clearInterval(intr)
      var prevNumInfected = 0
      intr = setInterval(function() {
        var newFrontier = []
        var hash = {} // hash to avoid duplicates.
        var numInfected = 0
        var i = history.length
        frontier.forEach(function(d) { visited[d.id] = true })
        frontier.forEach(function(d) {
          newFrontier = newFrontier.concat(d.friends.filter(function(d) {
            if (d.visible && !visited[d.id] && !hash[d.id]) {
              hash[d.id] = true
              d.infection = 1e-6
              d.generation = i
              numInfected++
              return true
            }else return false
          }))
        })
        frontier = newFrontier
        if(!numInfected || numInfected < prevNumInfected) {
          if (numInfected) updateHistory()
          step = function() { }
          return clearInterval(intr)
        }
        prevNumInfected = numInfected
        history.push({d: history[i - 1].d + numInfected, i: i })
        updateHistory()
      }, duration)
      var prevt = ppt
      step = function(t) {
        var dt = t - prevt
        prevt = t
        ctx.clearRect(0, 0, w, h)
        nodes.forEach(function(d) {
          if (d.infection > 0 && d.infection < 1) d.infection += dt / duration
          if (d.infection > 1) d.infection = 1
        })
        drawLinks()
        drawNodes()
      }
    }