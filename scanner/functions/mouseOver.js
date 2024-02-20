function mouseOver(d) {
  d3.select(this).select("path").transition()
     .duration(500)
     .attr("d", arcOver)
  var slice = d3.select(this)
  var indexValue = slice.attr("index_value")

  var pathSelector = "." + "path-" + indexValue
  var selectedPath = d3.selectAll(pathSelector)
  selectedPath.style("fill", options.hiColor)

  var textSelector = "." + "labels-" + indexValue
  var selectedText = d3.selectAll(textSelector)
  selectedText.transition()
    .duration(150)
    .style("font-size", "12px").style("font-weight", "bold").style("fill", options.hiColor)
  selectedText.attr("class", function(d, i) { return "labels-" + indexValue + " bigg" })
  }