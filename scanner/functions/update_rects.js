function update_rects(remove_circle, animate){
      var r = rects
      rects.interrupt().transition()
      if(animate)
          r = r.transition().duration(500)
      r.attr('width', function(d){ return x(d.x + d.width) - x(d.x) })
        .attr('x', function(d){ return x(d.x) })

      var t = events.select('text')
      t.interrupt().transition()
      if(animate) t = t.transition().duration(500)
      t.attr('x', function(d){ return x(d.x) + (x(d.width + d.x) - x(d.x)) / 2 })
      if(remove_circle === undefined) remove_circle = true
      if(remove_circle) circles.selectAll('g')
        .each(function(d){ d.ended = true }).remove()
    }