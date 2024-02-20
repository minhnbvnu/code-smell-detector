function toggled(paused) {
  d3.select("#pause").classed("hidden", paused);
  d3.select("#play").classed("hidden", !paused);
}