function showCorrPaths()
{
  nCompletedStepShowCorrPaths = 0;

  corrSigPath3
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .ease("cubic-out")
      .style("opacity", 0.4)
      .each("end", showRealSum);

  corrSigPathSin3
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .ease("cubic-out")
      .style("opacity", 0.4)
      .each("end", showRealSum);
}