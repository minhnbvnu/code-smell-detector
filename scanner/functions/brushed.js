function brushed() {

  var start = d3.event.selection ? t(d3.event.selection[0]) : 0,
      end = d3.event.selection ? t(d3.event.selection[1]) : 1;

  if (start === end) {
    start = 0;
    end = 1;
  } else {
    if (start <= 0.01) {
      start = 0;
    }
    if (end >= 0.99) {
      end = 1;
    }
  }

  d3.select("clipPath rect")
      .attr("x", t.invert(start))
      .attr("width", t.invert(end - start));

  onBrush([start, end]);

  if (d3.event.type === "end") {
    onBrushEnd([start, end]);
  }

}