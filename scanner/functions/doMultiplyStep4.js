function doMultiplyStep4()
{
  nCompletedStep3++;
  nCompletedStep4 = 0;

  if (nCompletedStep3 == 2)
  {
    cosConnector
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 0.0)
        .each("end", doMultiplyStep5);

    sinConnector
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 0.0)
        .each("end", doMultiplyStep5);
  }
}