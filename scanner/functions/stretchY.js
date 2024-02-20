function stretchY()
{
  yComp
    .transition()
      .duration(1500)
      .attr("y2", yRange(1.9))
      .each('end', moveY);
}