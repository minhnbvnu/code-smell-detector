function showRealComponentVector()
{
  complexRealVectors[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", showImagSum);
}