function updateSignal()
    {
      for (var i = 0; i < signalLength; i++)
      {
        var value = i < signal.length ? signal[i] : 0.0;

        signalPoints[i]
          .attr("cx", xRange(i))
          .attr("cy", yRangeTime(value));
      }
    }