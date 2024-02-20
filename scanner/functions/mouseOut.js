function mouseOut(d) {
  d3.select(this).select("path").transition()
     .duration(150)
     .attr("d", arc)
  var slice = d3.select(this)
  var indexValue = slice.attr("index_value")

  var pathSelector = "." + "path-" + indexValue
  var selectedPath = d3.selectAll(pathSelector)
  selectedPath.style("fill", function(d) { return d.data.hexcolor })

  var textSelector = "." + "labels-" + indexValue
  var selectedText = d3.selectAll(textSelector)
  selectedText.transition()
    .duration(200)
    .style("font-size", "10px").style("font-weight", "normal").style("fill", function(d) { return d.hexcolor })
  }