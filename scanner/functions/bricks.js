function bricks(rainbow) {
  return function(context, data, options) {

    context.fillStyle = options.waveColor;

    var waveHeight = options.waveBottom - options.waveTop;

    var barX = d3.scaleBand()
      .paddingInner(0.1)
      .paddingOuter(0.01)
      .domain(d3.range(data.length))
      .rangeRound([options.waveLeft, options.waveRight]);

    var height = d3.scaleLinear()
      .domain([0, 1])
      .range([0, waveHeight]);

    var barWidth = barX.bandwidth(),
        brickHeight = 10,
        brickGap = 3,
        maxBricks = Math.max(1, Math.floor(waveHeight / (brickHeight + brickGap)));

    data.forEach(function(val, i){

      var bricks = Math.max(1, Math.floor(height(val[0]) / (brickHeight + brickGap))),
          x = barX(i);

      d3.range(bricks).forEach(function(b){
        if (rainbow) {
          context.fillStyle = d3.interpolateWarm(1 - (b + 1) / maxBricks);
        }
        context.fillRect(x, options.waveBottom - (brickHeight * (b+1)) - brickGap * b, barWidth, brickHeight);
      });

    });

  };
}