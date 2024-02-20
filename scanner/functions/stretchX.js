function stretchX()
{
  xComp
    .transition()
      .duration(1500)
      .attr("x2", xRange(3))
      .each('end', stretchY);
}