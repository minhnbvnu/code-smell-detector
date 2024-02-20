function showPair()
{
  complexPairTexts[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", moveToNextBin);

  complexCircles[binNumber]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 0.4);
}