function MoveProbes()
{
  probeRight
    .transition()
    .duration(3000)
      .attr("x1", xRange(domainMax/expansionFactor))
      .attr("x2", xRange(domainMax/expansionFactor))
    .transition()
    .duration(3000)
      .attr("x1", xRange(domainMax))
      .attr("x2", xRange(domainMax));

  domainMax /= expansionFactor;
  xRange.domain([0, domainMax]);
  xAx
    .transition()
    .duration(3000)
    .delay(3000)
      .call(xAxis);

  path
    .transition()
    .duration(3000)
    .delay(3000)
      .attr('d', line(lineData))
      .each('end', nextIteration)
      ;

  for (var i = 0; i < dots.length; i++)
  {
    var currentX = parseFloat(dots[i].attr('cx'));
    var domainX = xRange.invert(currentX);
    var newX = xRange(domainX * expansionFactor);
    dots[i]
      .transition()
      .duration(3000)
      .delay(3000)
        .attr("cx", newX);
  }

  return true;
}