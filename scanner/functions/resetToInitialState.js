function resetToInitialState()
{
  iteration = 0;

  for (var i = 0; i < dots.length; i++)
  {
    dots[i].remove();
  }

  dots = [];
  domainMax = d3.max(lineData, function(d) { return d.x; });
  xRange.domain([0, domainMax]);
  xAx
      .call(xAxis);

  path
      .attr('d', line(lineData))
      ;
}