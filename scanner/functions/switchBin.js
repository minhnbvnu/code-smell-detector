function switchBin()
{
  isPlaying = true;
  updateButtons();

  corrSigPath3
    .transition()
    .style("opacity", 0.0);

  corrSigPathSin3
    .transition()
    .style("opacity", 0.0);

  samples3.data(corrSigSampleData)
    .attr("opacity", 0.0);

  samplesSin3.data(corrSigSampleData)
    .attr("opacity", 0.0);

  if (binNumber === 7)
  {
    isPlaying = false;
    updateButtons();
    return;
  }

  complexLabels[binNumber + 1]
    .transition()
      .duration(1000 * playbackSpeedFactor)
      .style("opacity", 0.50);

  currentBinIndicator
    .transition()
    .duration(1000 * playbackSpeedFactor)
      .attr("x", complexRangesX[binNumber + 1](-4) - 4.5);

  d3.timer(transitionToNextBin, 30);
}