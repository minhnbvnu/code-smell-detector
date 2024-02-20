function showAlias()
{
  aliasSignalPath.attr("d", aliasSignal(sigData));

  aliasSignalPath
    .transition()
      .duration(1000)
      .style("opacity", 0.35)
      .each("end", switchFrequency);
}