function doMultiplyStep()
{
  if (n == 8)
  {
    showCorrPaths();
    return;
  }

  var d = corrSigSampleData[n];
  nCompletedStep1 = 0;

  cosConnector
    .attr("x1", xRangeCorr(d))
    .attr("y1", yRangeCorr(sigFx(d)))
    .attr("x2", xRangeCorr(d))
    .attr("y2", yRangeCorr(sigFx(d)))
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.5)
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .style("opacity", 0.5)
      .attr("y2", yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)))
      .each("end", doMultiplyStep2)
    ;

  sinConnector
    .attr("x1", xRangeCorr(d) + xAxisOffsetRight)
    .attr("y1", yRangeCorr(sigFx(d)))
    .attr("x2", xRangeCorr(d) + xAxisOffsetRight)
    .attr("y2", yRangeCorr(sigFx(d)))
    .attr("stroke-width", 1.0)
    .attr("stroke", "grey")
    .style("opacity", 0.5)
    .transition()
      .duration(1500 * playbackSpeedFactor)
      .style("opacity", 0.5)
      .attr("y2", yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)))
      .each("end", doMultiplyStep2)
    ;

    sigRealTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    cosRealTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    sigImagTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);

    sinImagTexts[n]
      .transition()
        .duration(1500 * playbackSpeedFactor)
        .style("opacity", 1.0);
}