function moveY()
{
  yComp
    .transition()
      .duration(1500)
      .attr("x1", xRange(3))
      .attr("x2", xRange(3))
      .each('end', endit);
}