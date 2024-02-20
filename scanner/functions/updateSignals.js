function updateSignals()
{
  samples1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    ;

  samplesSin1.data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })
    ;

  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
}