function update_scale(){
      circles.selectAll('g')
        .transition().duration(500)
        .attr('transform', function(d){ return 'translate(' + x(d.p) + ',0)' })
      update_rects(false, true)
    }