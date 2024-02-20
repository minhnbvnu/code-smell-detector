function doMultiplyStep2()
{
  nCompletedStep1++;
  nCompletedStep2 = 0;

  if (nCompletedStep1 == 2)
  {
    samples3.filter(function(d, i) {return i == n;})
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep3);

    samplesSin3.filter(function(d, i) {return i == n;})
      .transition()
        .duration(500 * playbackSpeedFactor)
        .style("opacity", 1.0)
        .each("end", doMultiplyStep3);
  }
}