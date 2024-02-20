function updateMagnitudes()
    {
      var magnitudes = doFFT();

      for (var i = 0; i < signalLength; i++)
      {
        freqPoints[i]
          .attr("x", xRange(i) - 1.5)
          .attr("y", yRange(magnitudes[i]) - 1);

        freqSticks[i]
          .attr("x1", xRange(i))
          .attr("y1", yRange(0))
          .attr("x2", xRange(i))
          .attr("y2", yRange(magnitudes[i]));
      }
    }