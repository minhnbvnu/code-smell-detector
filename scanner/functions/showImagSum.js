function showImagSum()
{
  sinTexts[sinTexts.length - 1]
    .transition()
    .duration(1000 * playbackSpeedFactor)
    .style("opacity", 1.0)
    .each("end", showImagComponentVector);
}