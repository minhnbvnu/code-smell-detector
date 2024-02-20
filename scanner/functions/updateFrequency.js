function updateFrequency()
{

  document.getElementById("leakFreq2").innerHTML = "Input Frequency: &nbsp; <b>" + (currentFrequency * 1.0).toFixed(2) + " Hz</b>";

  if (currentFrequency === DIS_FREQUENCY)
  {
    return false;
  }

  currentFrequency = DIS_FREQUENCY;

  points
    .data(frequencies)
    .attr("y", function(d, i) {
      var diff = (currentFrequency - d) + 0.00001;
      var common = Math.PI * diff;
      var val = Math.sin(common) / common;
      return yRange(Math.abs(val)) - 2; });

  freqIndicator
    .attr("x1", function(d, i) { return xRange(currentFrequency); })
    .attr("x2", function(d, i) { return xRange(currentFrequency); });

  sincPath.attr("d", sinc(sincData));
  sincPathWindowed.attr("d", sincWindowed(sincData));
  signalPath.attr("d", signal(sigData));
  signalPathWindowed.attr("d", signalWindowed(sigData));

  perPath1.attr("d", perSignal(perData));
  perPath2.attr("d", perSignal(perData));
  perPath3.attr("d", perSignal(perData));
  perPath4.attr("d", perSignal(perData));

  perPath1Windowed.attr("d", perSignalWindowed(perData));
  perPath2Windowed.attr("d", perSignalWindowed(perData));
  perPath3Windowed.attr("d", perSignalWindowed(perData));
  perPath4Windowed.attr("d", perSignalWindowed(perData));

  for (var i = 0; i < 4; i++)
  {
    clicks[i]
      .attr("x1", function(d, i) { return xRangeTime2(0); })
      .attr("y1", function(d, i) { return yRangeTime(Math.sin(Math.PI * 2 * currentFrequency));} )
      .attr("x2", function(d, i) { return xRangeTime2(0); })
      .attr("y2", function(d, i) { return yRangeTime(0); })
  }
}