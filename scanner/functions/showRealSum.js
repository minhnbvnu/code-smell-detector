function showRealSum()
{
  nCompletedStepShowCorrPaths++;

  if (nCompletedStepShowCorrPaths == 2)
  {
    cosTexts[cosTexts.length - 1]
      .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 1.0)
      .each("end", showRealComponentVector);
  }

}