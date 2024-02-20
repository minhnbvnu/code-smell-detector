function doMultiplyStep3()
{
  nCompletedStep2++;
  nCompletedStep3 = 0;

  if (nCompletedStep2 == 2)
  {
    cosTexts[n]
      .transition()
        .duration(200 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep4);

    sinTexts[n]
      .transition()
        .duration(200 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep4);
  }
}