function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }