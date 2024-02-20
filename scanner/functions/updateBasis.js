function updateBasis()
{
  samples2
  .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr1(Math.cos(binNumber * d)); });

  samplesSin2
  .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr1(-Math.sin(binNumber * d)); });

corrSigPath2.attr("d", corrSig2(corrSigData));
corrSigPathSin2.attr("d", corrSigSin2(corrSigData));

currentBinIndicator
  .attr("x", complexRangesX[binNumber](-4) - 4.5)
}