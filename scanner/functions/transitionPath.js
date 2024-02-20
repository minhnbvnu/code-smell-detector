function transitionPath(p, dur, del, fin)
{
  console.log(fin);

  var totalLength = p.node().getTotalLength();
 
    p
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .style("opacity", 0.7)
    .transition()
      .duration(dur)
      .delay(del)
      .ease("linear")
      .attr("stroke-dashoffset", 0)
    .transition()
      .duration(100)
      .style("opacity", 0.0)
      .each("end", fin ? finish : null)
      ;
}