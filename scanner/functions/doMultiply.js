function doMultiply()
{
  corrSigPath1.attr("d", corrSig1(corrSigData));
  corrSigPathSin1.attr("d", corrSigSin1(corrSigData));
  corrSigPath2.attr("d", corrSig2(corrSigData));
  corrSigPathSin2.attr("d", corrSigSin2(corrSigData));
  corrSigPath3.attr("d", corrSig3(corrSigData));
  corrSigPathSin3.attr("d", corrSigSin3(corrSigData));

dpAreaPath
  .datum(corrSigData)
  .attr("d", dpArea);

  samples1
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })

  samplesSin1
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr(sigFx(d)); })

  samples3
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d); })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * Math.cos(binNumber * d)); });

  samplesSin3
    .data(corrSigSampleData)
    .attr("cx", function(d, i) { return xRangeCorr(d) + xAxisOffsetRight; })
    .attr("cy", function(d, i) { return yRangeCorr2(sigFx(d) * -Math.sin(binNumber * d)); });

  for (bin = 0; bin < 8; bin++)
  {
    var cosSum = 0;
    var sinSum = 0;

    for (j = 0; j < corrSigSampleData.length; j++)
    {
      var d = corrSigSampleData[j];
      var cosVal = sigFx(d) * Math.cos(bin * d);
      var sinVal = sigFx(d) * -Math.sin(bin * d);
      var cosBasisVal = Math.cos(bin * d);
      var sinBasisVal = -Math.sin(bin * d);
      var sigVal = sigFx(d);
      var sigValString = sigVal.toFixed(3);
      var cosBasisValString = cosBasisVal.toFixed(3);
      var sinBasisValString = sinBasisVal.toFixed(3);
      var cosValString = cosVal.toFixed(3);
      var sinValString = sinVal.toFixed(3);
      cosSum += cosVal;
      sinSum += sinVal;

      var additionalOffset = 30;
      var cosTextsX = plotWidth / 2 + 30 + xOffset + additionalOffset;
      var sinTextsX = plotWidth / 2 + 220 + 30 + xOffset + additionalOffset;
      var sigTextsRealX = plotWidth / 2 - 50 + xOffset + additionalOffset;
      var cosTextsRealX = plotWidth / 2 - 6 + xOffset + additionalOffset;
      var sigTextsImagX = plotWidth / 2 + 220 - 50 + xOffset + additionalOffset;
      var sinTextsImagX = plotWidth / 2 + 220 - 6 + xOffset + additionalOffset;
      var textOffsetY = 220;
    }

    if (isEpsilon(cosSum))
    {
      cosSum = 0;
    }

    if (isEpsilon(sinSum))
    {
      sinSum = 0;
    }

    var sign = sinSum >= 0
      ? "+"
      : "";

    complexPairTexts[bin]
      .text(cosSum.toFixed(3) + " " + sign + sinSum.toFixed(3) + "i")
      .style("opacity", 1.0);

    complexRealVectors[bin]
      .attr("x2", complexRangesX[bin](cosSum))
      .style("opacity", 1.0);

    complexImagVectors[bin]
      .attr("x1", complexRangesX[bin](cosSum))
      .attr("x2", complexRangesX[bin](cosSum))
      .attr("y2", complexRangeY(sinSum))
      .style("opacity", 1.0);

    complexVectors[bin]
      .attr("x2", complexRangesX[bin](cosSum))
      .attr("y2", complexRangeY(sinSum))
      .style("opacity", 1.0);

    complexCircles[bin]
      .attr("r", complexRangesX[bin](Math.sqrt(cosSum * cosSum + sinSum * sinSum)) - complexRangesX[bin](0))

    magnitudes[bin] = Math.sqrt((cosSum * cosSum) + (sinSum * sinSum));
    phases[bin] = Math.atan2(sinSum, cosSum);
  }

  sticks
    .data(magnitudes)
      .attr("x1", function(d, i) { return xRangeFreq(i); })
      .attr("y1", function(d, i) { return yRangeFreq(0); })
      .attr("x2", function(d, i) { return xRangeFreq(i); })
      .attr("y2", function(d, i) { return yRangeFreq(d); })
      ;

  points
    .data(magnitudes)
      .attr("x", function(d, i) { return xRangeFreq(i) - 2; })
      .attr("y", function(d, i) { return yRangeFreq(d) - 2})
      ;

  phaseSticks
  .data(phases)
    .attr("x1", function(d, i) { return xRangePhase(i); })
    .attr("y1", function(d, i) { return yRangePhase(0); })
    .attr("x2", function(d, i) { return xRangePhase(i); })
    .attr("y2", function(d, i) { return yRangePhase(d); })
    ;

  phasePoints
  .data(phases)
    .attr("x", function(d, i) { return xRangePhase(i) - 2; })
    .attr("y", function(d, i) { return yRangePhase(d) - 2})
    ;

}