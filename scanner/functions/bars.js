function bars(round) {

  return function(context, data, options) {

    context.fillStyle = options.waveColor;

    var waveHeight = options.waveBottom - options.waveTop;

    var baseline = options.waveTop + waveHeight / 2;

    var barX = d3.scaleBand()
      .paddingInner(0.5)
      .paddingOuter(0.01)
      .domain(d3.range(data.length))
      .rangeRound([options.waveLeft, options.waveRight]);

    var height = d3.scaleLinear()
      .domain([0, 1])
      .range([0, waveHeight / 2]);

    var barWidth = barX.bandwidth();

    data.forEach(function(val, i){

      var h = height(val[0]) * 2,
          x = barX(i),
          y = baseline - height(val[0]);

      context.fillRect(x, y, barWidth, h);

      if (round) {
        context.beginPath();
        context.arc(x + barWidth / 2, y, barWidth / 2, 0, 2 * Math.PI);
        context.moveTo(x + barWidth / 2, y + h);
        context.arc(x + barWidth / 2, y + h, barWidth / 2, 0, 2 * Math.PI);
        context.fill();
      }

    });
  }

}