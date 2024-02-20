function add_ball(){

      var dur = Math.random() * 2000
      dur = dur / (scope.dropFrequency/2) + 2000
      var p = Math.random()
      var pos = [{t: 0}, {t: 1}]
      var data = events_data
      var a, b, events = []

      if(data[0].x <= p && p <= data[0].x + data[0].width) a = data[0]
      if(data[1].x <= p && p <= data[1].x + data[1].width) b = data[1]
      if(a) pos.splice(bisector(pos) - 1, 0, { t: a.y, event: a.name})
      if(b) pos.splice(bisector(pos) - 1, 0, { t: b.y, event: b.name})
      if(a) events.push(a)
      if(b) events.push(b)
      var g = circles.append('g').datum({p: p, events: events })
        .attr('transform', 'translate(' + x(p) + ',0)')
      var circle = g.append('circle')
        .attr('r', r)
        .attr('cy', function(){ return 0 })

      pos.forEach(function(d, i){
        if(i === 0) return
        var dt = pos[i].t - pos[i - 1].t
        if(d.event) circle
        circle = circle
          .transition()
          .duration(dur * dt)
          .ease('bounce')
          // .ease('linear')
          .attr('cy', function(){ return y(d.t) })
          .each('end', function(){ if(d.event) d3.select(this).classed(d.event, true) })
      })
      circle.each('end', function(d){
        if(d.ended) return
        var name = d.events.reduce(function(prev, cur){ return prev + cur.name }, '')
        if(name === '') name = 'None'
        scope['count' + name]++
        scope.countTotal++
        g.remove()
        scope.$apply()
      })
    }