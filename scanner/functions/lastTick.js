function lastTick(chart) {
      var xAxis = chart.scales.x;
      var ticks = xAxis.getTicks();
      return ticks[ticks.length - 1];
    }