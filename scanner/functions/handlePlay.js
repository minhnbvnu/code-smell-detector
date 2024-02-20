function handlePlay()
{
  if (isPlaying)
  {
    return;
  }

 for (var i = 0; i < sampleValues.length; i++)
  {
    sampleValues[i].transition()
      .duration(0)
      .style("opacity", 0.0);
  }

  points
    .style('opacity', 0.0)
      .transition()
      .duration(100)
      .delay(function (d, i) {return sampleDelays[i];})
      .style('opacity', 1.0);

  sticks
    .style("opacity", 0.0)
    .transition()
      .duration(0)
      .delay(function (d, i) { return sampleDelays[i]; })
      .attr("y1", function(d, i) { return findYatXbyBisection(xRange(d * 10), path.node(), 0.1);} )
      .style("opacity", 0.6)
    ;

  isPlaying = true;
  updateButtons();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .style("opacity", 1.0)
    .transition()
      .duration(10000)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
      //.each("end", finish)
      ; 

  pathFollower 
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .style("opacity", 0.80)
    .transition()
      .duration(10000)
      .delay(100)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
      .each("end", finish); 


  isPlaying = true;
  updateButtons();
}