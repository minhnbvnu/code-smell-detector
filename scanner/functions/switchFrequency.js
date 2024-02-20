function switchFrequency()
{
  currentFrequency++;

  if (currentFrequency >= frequencies.length)
  {
    currentFrequency = 0;
  }

  indicator
    .transition()
      .duration(1000)
      .delay(3000)
      .attr("cx", xRange(frequencies[currentFrequency]))
      .each("end", showAlias);

  aliasSignalPath
    .transition()
      .delay(3000)
      .duration(500)
      .style("opacity", 0.0);
}